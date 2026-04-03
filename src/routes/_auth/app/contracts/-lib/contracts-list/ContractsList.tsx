import type { GetContractsResponse } from '@/api/contract/getContracts';
import { CardListView } from '@/components/card-list-view/CardListView';
import { ContractCard } from './ContractCard';
import { ContractListSelector } from './ContractListSelector';

export type ContractsListProps = {
	contracts: GetContractsResponse;
	selectedContract: GetContractsResponse[number];
	onSelectContract: (contract: GetContractsResponse[number]) => void;
	onCreateNewContract: () => void;
};
export const ContractsList = ({
	contracts,
	selectedContract,
	onSelectContract,
	onCreateNewContract,
}: ContractsListProps) => {
	return (
		<CardListView.Root>
			<ContractListSelector
				contracts={contracts}
				selectedContract={selectedContract}
				onSelectContract={onSelectContract}
				onCreateNewContract={onCreateNewContract}
			/>

			<ContractCard contract={selectedContract} />
		</CardListView.Root>
	);
};
