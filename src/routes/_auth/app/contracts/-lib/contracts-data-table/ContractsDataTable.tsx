import { getContractsQueryOptions } from '@/api/contract/getContracts';
import { DataTable } from '@/components/data-table';
import { useQuery } from '@tanstack/react-query';
import {
	useContractDataTableColumns,
	useContractDataTableRowActions,
	useContractDataTableToolbarActions,
} from './contractDataTableConfig';

export const ContractsDataTable = () => {
	const { data, isFetching } = useQuery(getContractsQueryOptions());

	const columns = useContractDataTableColumns();
	const toolbarActions = useContractDataTableToolbarActions();
	const rowActions = useContractDataTableRowActions();

	return (
		<DataTable
			data={data}
			isLoading={isFetching}
			columns={columns}
			toolbarActions={toolbarActions}
			rowActions={rowActions}
		/>
	);
};
