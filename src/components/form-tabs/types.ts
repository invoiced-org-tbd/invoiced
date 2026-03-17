import type {
	TabsListProps,
	TabsTriggerProps,
	TabsContentProps,
	TabsRootProps,
} from '../tabs/types';

export type FormTabsRootProps = TabsRootProps & {
	/**
	 * @default 'tab'
	 */
	searchParamKey?: string;
};

export type FormTabsListProps = TabsListProps;

export type FormTabsTriggerProps<TParamsKey extends string = string> =
	TabsTriggerProps & {
		value: TParamsKey;
	};

export type FormTabsContentProps<TParamsKey extends string = string> =
	TabsContentProps & {
		value: TParamsKey;
	};
