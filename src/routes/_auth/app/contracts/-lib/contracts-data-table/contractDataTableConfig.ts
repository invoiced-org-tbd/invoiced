import type { GetContractsResponse } from '@/api/contract/getContracts';
import type {
	DataTableColumn,
	DataTableRowAction,
	DataTableToolbarAction,
} from '@/components/data-table';
import { getTableAddToolbarAction } from '@/components/data-table/data-table-toolbar/baseTableToolbarActions';
import { useGetTableEditRowAction } from '@/components/data-table/use-data-table/baseTableRowActions';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

export const useContractDataTableColumns = (): DataTableColumn<
	GetContractsResponse[number]
>[] => {
	const { t } = useTranslate();

	return [
		{
			accessorKey: 'description',
			header: t('contracts.description'),
		},
	];
};

export const useContractDataTableToolbarActions = (): DataTableToolbarAction<
	GetContractsResponse[number]
>[] => {
	const { t } = useTranslate();
	const navigate = contractsRouteApi.useNavigate();

	return [
		getTableAddToolbarAction({
			label: t('contracts.newContract'),
			onClick: () => {
				navigate({
					search: (prev) => ({
						...prev,
						isCreating: true,
					}),
				});
			},
		}),
	];
};

export const useContractDataTableRowActions = (): DataTableRowAction<
	GetContractsResponse[number]
>[] => {
	const navigate = contractsRouteApi.useNavigate();
	const { getTableEditRowAction } =
		useGetTableEditRowAction<GetContractsResponse[number]>();

	return [
		getTableEditRowAction({
			onClick: (data) => {
				navigate({
					search: (prev) => ({
						...prev,
						editId: data.id,
					}),
				});
			},
		}),
	];
};
