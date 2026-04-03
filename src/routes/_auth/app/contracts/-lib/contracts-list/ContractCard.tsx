import type { GetContractsResponse } from '@/api/contract/getContracts';
import { CardListView } from '@/components/card-list-view/CardListView';
import { ContractCardContent } from './ContractCardContent';
import { ContractCardFooter } from './ContractCardFooter';
import { ContractCardHeader } from './ContractCardHeader';

type ContractCardProps = {
	contract: GetContractsResponse[number];
};
export const ContractCard = ({ contract }: ContractCardProps) => {
	return (
		<CardListView.Card.Root>
			<div className='space-y-4'>
				<ContractCardHeader contract={contract} />

				<ContractCardContent contract={contract} />
			</div>

			<ContractCardFooter contract={contract} />
		</CardListView.Card.Root>
	);
};
