import type { GetContractsResponse } from '@/api/contract/getContracts';
import { ContractCard } from './ContractCard';
import { ContractListSelector } from './ContractListSelector';

export type ContractsListProps = {
	contracts: GetContractsResponse;
	selectedContractId: string;
	onSelectContract: (contract: GetContractsResponse[number]) => void;
	onCreateNewContract: () => void;
};
export const ContractsList = ({
	contracts,
	selectedContractId,
	onSelectContract,
	onCreateNewContract,
}: ContractsListProps) => {
	const selectedContract =
		contracts.find((contract) => contract.id === selectedContractId) ??
		contracts[0];

	return (
		<section className='flex gap-8'>
			<ContractListSelector
				contracts={contracts}
				selectedContractId={selectedContractId}
				onSelectContract={onSelectContract}
				onCreateNewContract={onCreateNewContract}
			/>

			<ContractCard contract={selectedContract} />
		</section>
	);
};
