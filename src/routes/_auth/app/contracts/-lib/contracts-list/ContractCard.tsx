import type { GetContractsResponse } from '@/api/contract/getContracts';
import { Card } from '@/components/card/Card';
import { ContractCardContent } from './ContractCardContent';
import { ContractCardFooter } from './ContractCardFooter';
import { ContractCardHeader } from './ContractCardHeader';

type ContractCardProps = {
	contract: GetContractsResponse[number];
};
export const ContractCard = ({ contract }: ContractCardProps) => {
	return (
		<Card.Root className='w-full flex flex-col justify-between relative border-t-0'>
			<div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/55 to-transparent' />

			<div className='space-y-4'>
				<ContractCardHeader contract={contract} />

				<ContractCardContent contract={contract} />
			</div>

			<ContractCardFooter contract={contract} />
		</Card.Root>
	);
};
