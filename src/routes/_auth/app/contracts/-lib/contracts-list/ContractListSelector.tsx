import type { GetContractsResponse } from '@/api/contract/getContracts';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { cn } from '@/utils/classNamesUtils';
import { formatCurrency } from '@/utils/currencyUtils';
import { getRouteApi } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

type ContractListSelectorProps = {
	contracts: GetContractsResponse;
	selectedContractId: string;
	onSelectContract: (contract: GetContractsResponse[number]) => void;
	onCreateNewContract: () => void;
};
export const ContractListSelector = ({
	contracts,
	selectedContractId,
	onSelectContract,
	onCreateNewContract,
}: ContractListSelectorProps) => {
	const { t } = useTranslate();
	const totalContracts = contracts.length;
	const showTotalContracts = totalContracts > 1;

	return (
		<section className='w-max min-w-3xs h-full border border-border/60 shadow-xs rounded-lg relative'>
			<div className='pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/55 to-transparent' />

			<div className='border-b border-border/60 p-3 '>
				<p className='text-sm font-medium'>
					{t('contracts.title')} {showTotalContracts && `(${totalContracts})`}
				</p>
			</div>

			<div className='p-2 space-y-1 w-full'>
				{contracts.map((contract) => {
					const isSelected = contract.id === selectedContractId;

					return (
						<contractsRouteApi.Link
							key={contract.id}
							to='.'
							search={(prev) => ({ ...prev, selectedContractId: contract.id })}
							className={cn(
								'block text-sm text-muted-foreground space-y-0.5 w-full text-left rounded-lg p-2 cursor-pointer transition-colors',
								isSelected ? 'bg-primary/10' : 'hover:bg-primary/5',
							)}
							onClick={() => onSelectContract(contract)}
						>
							<div>
								<p className='font-medium text-foreground'>
									{contract.client.companyName}
								</p>
								<p>{contract.role.description}</p>
							</div>

							<div>
								<p className='text-primary-muted'>
									{formatCurrency({ value: contract.role.rate })}
								</p>
							</div>
						</contractsRouteApi.Link>
					);
				})}

				<button
					type='button'
					className={cn(
						'w-full rounded-lg py-7 border-2 border-dotted cursor-pointer transition-colors hover:bg-foreground/2',
						'text-sm text-muted-foreground font-medium',
						'flex items-center justify-center gap-1',
					)}
					onClick={onCreateNewContract}
				>
					<PlusIcon className='size-4' />
					{t('contracts.list.addContract')}
				</button>
			</div>
		</section>
	);
};
