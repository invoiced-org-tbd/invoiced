import { DEFAULT_DATA_TABLE_PAGE_SIZE_OPTIONS } from '../consts';
import type { DataTablePaginationState } from '../schemas';

export const DATA_TABLE_INITIAL_PAGE_INDEX = 0;

export const DATA_TABLE_DEFAULT_PAGINATION_STATE: DataTablePaginationState = {
	pageIndex: DATA_TABLE_INITIAL_PAGE_INDEX,
	pageSize: DEFAULT_DATA_TABLE_PAGE_SIZE_OPTIONS[0],
};
