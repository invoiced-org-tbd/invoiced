import { Separator } from '@/components/separator/Separator';
import { useFormContext } from '@/hooks/use-app-form/useAppForm';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { cn } from '@/utils/classNamesUtils';
import { useStore } from '@tanstack/react-form';
import { useBlocker } from '@tanstack/react-router';
import type { SubmitEvent } from 'react';
import { useMemo } from 'react';
import type { ZodObject } from 'zod';
import { Button } from '../button/Button';
import { Dialog } from '../dialog/Dialog';
import type {
	FormCancelButtonProps,
	FormGroupProps,
	FormRootProps,
	FormSeparatorProps,
	FormSetProps,
	FormSubmitButtonProps,
	FormSubSetProps,
} from './types';
import type { FormRootContextValue } from './utils';
import {
	FormRootContext,
	isDangerousNavigation,
	useFormRootContext,
} from './utils';

const FormRoot = <TFormSchema extends ZodObject>({
	className,
	children,
	form: formApi,
	isLoading = false,
	schema,
	safeSearchParamKeys = [],
}: FormRootProps<TFormSchema>) => {
	const formRootContextValue = useMemo<FormRootContextValue<TFormSchema>>(
		() => ({
			isLoading,
			schema,
			safeSearchParamKeys,
		}),
		[isLoading, schema, safeSearchParamKeys],
	);

	const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		formApi.handleSubmit();
	};

	return (
		<FormRootContext.Provider value={formRootContextValue}>
			<formApi.AppForm>
				<form
					className={cn(
						'w-full flex flex-col h-auto min-h-0 flex-1',
						className,
					)}
					onSubmit={handleSubmit}
				>
					{children}
				</form>

				<FormNavigationBlocker />
			</formApi.AppForm>
		</FormRootContext.Provider>
	);
};

const FormNavigationBlocker = () => {
	const form = useFormContext();
	const formRootContext = useFormRootContext();

	const { isDefaultValue } = useStore(form.store, (state) => ({
		isDefaultValue: state.isDefaultValue,
	}));

	const { status, reset, proceed } = useBlocker({
		withResolver: true,
		shouldBlockFn: ({ current, next }) => {
			if (isDefaultValue) {
				return false;
			}

			const safeSearchParamKeys = formRootContext?.safeSearchParamKeys ?? [];

			return isDangerousNavigation({
				current,
				next,
				safeSearchParamKeys,
			});
		},
	});
	const isBlocked = status === 'blocked';

	const handleCancel = () => {
		if (!isBlocked) {
			return;
		}

		reset();
	};

	const handleConfirm = () => {
		if (!isBlocked) {
			return;
		}

		proceed();
	};

	return (
		<Dialog.Root
			open={isBlocked}
			onOpenChange={handleCancel}
		>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Unsaved changes</Dialog.Title>
					<Dialog.Description>
						You have unsaved changes. Are you sure you want to leave?
					</Dialog.Description>
				</Dialog.Header>
				<Dialog.Footer>
					<Button
						variant='destructive'
						isGhost={true}
						onClick={handleConfirm}
					>
						Discard
					</Button>
					<Button
						variant='secondary'
						onClick={handleCancel}
					>
						Stay
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};

const FormSet = ({ className, ...props }: FormSetProps) => {
	return (
		<fieldset
			data-slot='field-set'
			className={cn(
				'p-2 gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col',
				className,
			)}
			{...props}
		/>
	);
};

const Group = ({ className, ...props }: FormGroupProps) => {
	return (
		<div
			data-slot='field-group'
			className={cn(
				'gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4 group/field-group @container/field-group flex w-full flex-col',
				className,
			)}
			{...props}
		/>
	);
};

const SubSet = ({ className, ...props }: FormSubSetProps) => {
	return (
		<section
			data-slot='field-sub-set'
			className={cn(
				'p-2 gap-4 flex flex-col border rounded-lg border-border',
				className,
			)}
			{...props}
		/>
	);
};

const FormSeparator = ({
	children,
	className,
	...props
}: FormSeparatorProps) => {
	return (
		<div
			data-slot='field-separator'
			data-content={!!children}
			className={cn(
				'-my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2 relative',
				className,
			)}
			{...props}
		>
			<Separator className='absolute inset-0 top-1/2' />
			{children && (
				<span
					className='text-muted-foreground px-2 bg-background relative mx-auto block w-fit'
					data-slot='field-separator-content'
				>
					{children}
				</span>
			)}
		</div>
	);
};

const FormSubmitButton = (props: FormSubmitButtonProps) => {
	const form = useFormContext();
	const formRootContext = useFormRootContext();
	const { t } = useTranslate();

	return (
		<form.Subscribe
			selector={(state) => ({
				isSubmitting: state.isSubmitting,
				canSubmit: state.canSubmit,
			})}
			children={({ isSubmitting, canSubmit }) => {
				const isLoading = !!isSubmitting || !!props.isLoading;
				const isDisabled =
					props.disabled || !canSubmit || !!formRootContext?.isLoading;

				return (
					<Button
						type='submit'
						{...props}
						disabled={isDisabled}
						isLoading={isLoading}
					>
						{props.children ?? t('common.submit')}
					</Button>
				);
			}}
		/>
	);
};

const FormCancelButton = (props: FormCancelButtonProps) => {
	const form = useFormContext();
	const { t } = useTranslate();

	return (
		<form.Subscribe
			selector={(state) => ({
				isSubmitting: state.isSubmitting,
			})}
			children={({ isSubmitting }) => {
				const isDisabled = isSubmitting || props.disabled;

				return (
					<Button
						type='button'
						variant='secondary'
						{...props}
						disabled={isDisabled}
					>
						{props.children ?? t('common.cancel')}
					</Button>
				);
			}}
		/>
	);
};

export const Form = {
	Root: FormRoot,
	Set: FormSet,
	Group,
	SubSet,
	Separator: FormSeparator,
	SubmitButton: FormSubmitButton,
	CancelButton: FormCancelButton,
};
