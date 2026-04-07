import { BaseField } from '@/components/base-field/BaseField';
import { fieldInputVariants } from '@/components/base-field/consts';
import { useBaseField } from '@/components/base-field/useBaseField';
import { Button } from '@/components/button/Button';
import {
	bodyToEditorHtml,
	sanitizeEmailTemplateHtml,
} from '@/lib/email-template-variables';
import { cn } from '@/utils/classNamesUtils';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
	BoldIcon,
	ItalicIcon,
	ListIcon,
	ListOrderedIcon,
	UnderlineIcon,
} from 'lucide-react';
import type { BaseFieldInputProps } from '@/components/base-field/types';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import {
	EmailMergeField,
	emailMergeFieldName,
} from './emailMergeFieldExtension';
import { EmailTemplateVariableMenu } from './EmailTemplateVariableMenu';

type EmailTemplateRichTextFieldProps = BaseFieldInputProps<string> & {
	label: string;
	tooltip?: ReactNode;
	description?: string;
	placeholder: string;
	formattingToolbarLabel: string;
	variableMenuLabel: string;
	toolbarBoldLabel: string;
	toolbarItalicLabel: string;
	toolbarUnderlineLabel: string;
	toolbarBulletListLabel: string;
	toolbarOrderedListLabel: string;
};

export const EmailTemplateRichTextField = ({
	label,
	tooltip,
	description,
	placeholder,
	formattingToolbarLabel,
	variableMenuLabel,
	toolbarBoldLabel,
	toolbarItalicLabel,
	toolbarUnderlineLabel,
	toolbarBulletListLabel,
	toolbarOrderedListLabel,
	value,
	onChange,
	onBlur,
	errors,
	showErrors,
	disabled,
	required,
	readOnly,
}: EmailTemplateRichTextFieldProps) => {
	const { inputProps } = useBaseField({
		errors,
		showErrors,
		disabled,
		required,
		readOnly,
	});

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
				EmailMergeField,
			],
			content: bodyToEditorHtml(value ?? ''),
			editorProps: {
				attributes: {
					class: cn(
						'tiptap-email-body min-h-24 w-full max-w-none py-1 text-base outline-none md:text-sm',
					),
				},
			},
			editable: !(disabled || readOnly),
			onUpdate: ({ editor: ed }) => {
				onChange?.(sanitizeEmailTemplateHtml(ed.getHTML()));
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
		editor.setEditable(!(disabled || readOnly));
	}, [editor, disabled, readOnly]);

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
						(disabled || readOnly) && 'pointer-events-none opacity-50',
					)}
				>
					{editor ? (
						<>
							<div
								role='toolbar'
								className='flex flex-wrap items-center gap-1 border-border border-b pb-2'
								aria-label={formattingToolbarLabel}
							>
								<Button
									type='button'
									size='xxs'
									variant={editor.isActive('bold') ? 'primary' : 'secondary'}
									isIcon
									isOutlined={!editor.isActive('bold')}
									disabled={disabled || readOnly}
									aria-label={toolbarBoldLabel}
									aria-pressed={editor.isActive('bold')}
									onClick={() => {
										editor.chain().focus().toggleBold().run();
									}}
								>
									<BoldIcon className='size-3.5' />
								</Button>
								<Button
									type='button'
									size='xxs'
									variant={editor.isActive('italic') ? 'primary' : 'secondary'}
									isIcon
									isOutlined={!editor.isActive('italic')}
									disabled={disabled || readOnly}
									aria-label={toolbarItalicLabel}
									aria-pressed={editor.isActive('italic')}
									onClick={() => {
										editor.chain().focus().toggleItalic().run();
									}}
								>
									<ItalicIcon className='size-3.5' />
								</Button>
								<Button
									type='button'
									size='xxs'
									variant={
										editor.isActive('underline') ? 'primary' : 'secondary'
									}
									isIcon
									isOutlined={!editor.isActive('underline')}
									disabled={disabled || readOnly}
									aria-label={toolbarUnderlineLabel}
									aria-pressed={editor.isActive('underline')}
									onClick={() => {
										editor.chain().focus().toggleUnderline().run();
									}}
								>
									<UnderlineIcon className='size-3.5' />
								</Button>
								<Button
									type='button'
									size='xxs'
									variant={
										editor.isActive('bulletList') ? 'primary' : 'secondary'
									}
									isIcon
									isOutlined={!editor.isActive('bulletList')}
									disabled={disabled || readOnly}
									aria-label={toolbarBulletListLabel}
									aria-pressed={editor.isActive('bulletList')}
									onClick={() => {
										editor.chain().focus().toggleBulletList().run();
									}}
								>
									<ListIcon className='size-3.5' />
								</Button>
								<Button
									type='button'
									size='xxs'
									variant={
										editor.isActive('orderedList') ? 'primary' : 'secondary'
									}
									isIcon
									isOutlined={!editor.isActive('orderedList')}
									disabled={disabled || readOnly}
									aria-label={toolbarOrderedListLabel}
									aria-pressed={editor.isActive('orderedList')}
									onClick={() => {
										editor.chain().focus().toggleOrderedList().run();
									}}
								>
									<ListOrderedIcon className='size-3.5' />
								</Button>
								<div className='ml-auto'>
									<EmailTemplateVariableMenu
										disabled={disabled || readOnly}
										triggerLabel={variableMenuLabel}
										onInsert={(id) => {
											editor
												.chain()
												.focus()
												.insertContent({
													type: emailMergeFieldName,
													attrs: { id },
												})
												.run();
										}}
									/>
								</div>
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
