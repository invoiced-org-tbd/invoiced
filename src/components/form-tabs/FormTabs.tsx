import { useNavigate, useSearch } from '@tanstack/react-router';
import { Tabs } from '../tabs';
import type {
	FormTabsContentProps,
	FormTabsListProps,
	FormTabsRootProps,
	FormTabsTriggerProps,
} from './types';
import { useFormContext } from '@/hooks/use-app-form';
import { useStore } from '@tanstack/react-form';

const Root = ({ searchParamKey = 'tab', ...props }: FormTabsRootProps) => {
	const navigate = useNavigate();

	const currentTab = useSearch({
		strict: false,
		select: (search) => {
			let resolved: string | undefined;

			const value = search[searchParamKey as keyof typeof search];
			if (value) {
				resolved = String(value);
			}

			return resolved;
		},
	});

	const handleValueChange = (value: string) => {
		if (!value || value === currentTab) {
			return;
		}

		navigate({
			to: '.',
			search: (prev) => ({
				...prev,
				[searchParamKey]: value,
			}),
		});
	};

	return (
		<Tabs.Root
			value={currentTab}
			onValueChange={handleValueChange}
			{...props}
		/>
	);
};

const List = (props: FormTabsListProps) => {
	return <Tabs.List {...props} />;
};

const Trigger = <TParamsKey extends string = string>(
	props: FormTabsTriggerProps<TParamsKey>,
) => {
	const { value } = props;

	const form = useFormContext();
	const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
	const canSubmit = useStore(form.store, (state) => state.canSubmit);
	const submissionAttempts = useStore(
		form.store,
		(state) => state.submissionAttempts,
	);
	const errors = useStore(form.store, (state) => state.errors);
	let hasErrors = false;

	for (const key in errors[0]) {
		const paths = key.split('.');
		if (paths.length < 2) {
			continue;
		}
		const tabIndex = paths.indexOf(value);
		if (tabIndex === -1) {
			continue;
		}

		if (tabIndex < paths.length - 1) {
			const isFieldTouched = form.getFieldMeta(key as never)?.isTouched;
			const showFieldErrors =
				!!isFieldTouched || submissionAttempts > 0 || !canSubmit;
			if (!showFieldErrors) {
				continue;
			}

			hasErrors = true;
			break;
		}
	}

	const isDisabled = isSubmitting || props.disabled;

	return (
		<Tabs.Trigger
			variant={hasErrors ? 'error' : 'default'}
			{...props}
			disabled={isDisabled}
		/>
	);
};

const Content = <TParamsKey extends string = string>(
	props: FormTabsContentProps<TParamsKey>,
) => {
	return <Tabs.Content {...props} />;
};

export const createFormTabs = <TParamsKey extends string = string>() => {
	return {
		Root,
		List,
		Trigger: Trigger<TParamsKey>,
		Content: Content<TParamsKey>,
	};
};
