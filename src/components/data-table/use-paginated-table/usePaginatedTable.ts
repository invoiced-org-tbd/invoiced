import { useState } from 'react';
import type {
	DataTableOrderByState,
	DataTablePaginationState,
} from '../schemas';
import type { GetPaginatedQueryOptions } from '@/utils/schemaUtils';
import type { DataTableServerProps } from '../types';
import type { PaginatedResponseData } from '@/utils/serverFnsUtils';
import { DATA_TABLE_DEFAULT_PAGINATION_STATE } from '../use-data-table/consts';
import { useCompany } from '@/hooks/use-company';

export const usePaginatedTable = <TData>() => {
	const { company } = useCompany();

	const [pagination, setPagination] = useState<DataTablePaginationState>(
		DATA_TABLE_DEFAULT_PAGINATION_STATE,
	);
	const [orderBy, setOrderBy] = useState<DataTableOrderByState>({
		id: 'createdAt',
		desc: true,
	});

	const getPaginatedQueryOptions = (): GetPaginatedQueryOptions => {
		return {
			companyId: company.id,
			pagination,
			orderBy,
		};
	};

	const getPaginatedTableOptions = ({
		data,
	}: {
		data?: PaginatedResponseData<TData>;
	}): Pick<DataTableServerProps<TData>, 'pagination' | 'sort' | 'data'> => {
		return {
			data: data?.items,
			pagination: {
				isServerSide: true,
				state: pagination,
				setState: setPagination,
				totalItems: data?.total ?? 0,
			},
			sort: {
				state: orderBy,
				setState: setOrderBy,
			},
		};
	};

	return {
		getPaginatedQueryOptions,
		getPaginatedTableOptions,
	};
};
