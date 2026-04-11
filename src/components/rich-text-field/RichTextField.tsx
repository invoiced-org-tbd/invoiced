import { BaseField } from '@/components/base-field/BaseField';
import { fieldInputVariants } from '@/components/base-field/consts';
import { useBaseField } from '@/components/base-field/useBaseField';
import { Toggle } from '@/components/toggle/Toggle';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { cn } from '@/utils/classNamesUtils';
import Placeholder from '@tiptap/extension-placeholder';
import type { Editor } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
	BoldIcon,
	ItalicIcon,
	ListIcon,
	ListOrderedIcon,
	UnderlineIcon,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import type { RichTextFieldProps } from './types';

type ToolbarAction = {
	name: string;
	icon: ComponentType<{ className?: string }>;
	label: string;
	command: (editor: Editor) => void;
};

const useToolbarActions = (): ToolbarAction[] => {
	const { t } = useTranslate();

	return [
		{
			name: 'bold',
			icon: BoldIcon,
			label: t('richTextField.toolbar.bold'),
			command: (e) => e.chain().focus().toggleBold().run(),
		},
		{
			name: 'italic',
			icon: ItalicIcon,
			label: t('richTextField.toolbar.italic'),
			command: (e) => e.chain().focus().toggleItalic().run(),
		},
		{
			name: 'underline',
			icon: UnderlineIcon,
			label: t('richTextField.toolbar.underline'),
			command: (e) => e.chain().focus().toggleUnderline().run(),
		},
		{
			name: 'bulletList',
			icon: ListIcon,
			label: t('richTextField.toolbar.bulletList'),
			command: (e) => e.chain().focus().toggleBulletList().run(),
		},
		{
			name: 'orderedList',
			icon: ListOrderedIcon,
			label: t('richTextField.toolbar.orderedList'),
			command: (e) => e.chain().focus().toggleOrderedList().run(),
		},
	];
};

export const RichTextField = ({
	label,
	tooltip,
	description,
	placeholder,
	extensions = [],
	toolbarRightSlot,
	parseValue,
	serializeHtml,
	value,
	onChange,
	onBlur,
	errors,
	showErrors,
	disabled,
	required,
	readOnly,
}: RichTextFieldProps) => {
	const { t } = useTranslate();
	const actions = useToolbarActions();
	const { inputProps } = useBaseField({
		errors,
		showErrors,
		disabled,
		required,
		readOnly,
	});

	const isDisabled = disabled || readOnly;

	const editor = useEditor(
		{
			immediatelyRender: false,
			shouldRerenderOnTransaction: true,
			extensions: [
				StarterKit.configure({
					heading: false,
					blockquote: false,
					codeBlock: false,
					code: false,
					horizontalRule: false,
					link: false,
				}),
				Placeholder.configure({
					placeholder,
					emptyNodeClass: 'is-editor-empty',
				}),
				...extensions,
			],
			content: parseValue ? parseValue(value ?? '') : (value ?? ''),
			editorProps: {
				attributes: {
					class: cn(
						'tiptap-email-body min-h-24 w-full max-w-none py-1 text-base outline-none md:text-sm',
					),
				},
			},
			editable: !isDisabled,
			onUpdate: ({ editor: ed }) => {
				const html = ed.getHTML();
				onChange?.(serializeHtml ? serializeHtml(html) : html);
			},
		},
		[],
	);

	useEffect(() => {
		if (!editor) {
			return;
		}
		const dom = editor.view.dom as HTMLElement;
		const handleBlur = () => {
			onBlur?.();
		};
		dom.addEventListener('blur', handleBlur);
		return () => {
			dom.removeEventListener('blur', handleBlur);
		};
	}, [editor, onBlur]);

	useEffect(() => {
		if (!editor) {
			return;
		}
		editor.setEditable(!isDisabled);
	}, [editor, isDisabled]);

	return (
		<BaseField.Root>
			<BaseField.Label
				htmlFor={undefined}
				required={inputProps.required}
				tooltip={tooltip}
			>
				{label}
			</BaseField.Label>

			<BaseField.Control>
				<div
					className={cn(
						fieldInputVariants({ focusMode: 'focusVisible' }),
						'flex h-auto min-h-32 flex-col gap-2 p-2',
						isDisabled && 'pointer-events-none opacity-50',
					)}
				>
					{editor ? (
						<>
							<div
								role='toolbar'
								className='flex flex-wrap items-center gap-1 border-border border-b pb-2'
								aria-label={t('richTextField.toolbar.label')}
							>
								{actions.map(({ name, icon: Icon, label, command }) => (
									<Toggle
										key={name}
										size='sm'
										pressed={editor.isActive(name)}
										onPressedChange={() => command(editor)}
										disabled={isDisabled}
										aria-label={label}
									>
										<Icon className='size-3.5' />
									</Toggle>
								))}
								{toolbarRightSlot && (
									<div className='ml-auto'>{toolbarRightSlot(editor)}</div>
								)}
							</div>
							<EditorContent editor={editor} />
						</>
					) : (
						<div
							className='text-muted-foreground min-h-32 py-2 text-sm'
							aria-hidden
						>
							{placeholder}
						</div>
					)}
				</div>
			</BaseField.Control>

			<BaseField.Description>{description}</BaseField.Description>
			<BaseField.Error
				errors={errors}
				showErrors={showErrors}
			/>
		</BaseField.Root>
	);
};
