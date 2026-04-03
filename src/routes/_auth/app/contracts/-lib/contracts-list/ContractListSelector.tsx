import type { GetContractsResponse } from '@/api/contract/getContracts';
import { CardListView } from '@/components/card-list-view/CardListView';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { formatCurrency } from '@/utils/currencyUtils';
import { getRouteApi } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

type ContractListSelectorProps = {
	contracts: GetContractsResponse;
	selectedContract: GetContractsResponse[number];
	onSelectContract: (contract: GetContractsResponse[number]) => void;
	onCreateNewContract: () => void;
};
export const ContractListSelector = ({
	contracts,
	selectedContract,
	onSelectContract,
	onCreateNewContract,
}: ContractListSelectorProps) => {
	const { t } = useTranslate();
	const totalContracts = contracts.length;
	const showTotalContracts = totalContracts > 1;

	return (
		<CardListView.List.Root>
			<CardListView.List.Title>
				{t('contracts.title')} {showTotalContracts && `(${totalContracts})`}
			</CardListView.List.Title>

			<CardListView.List.Content>
				{contracts.map((contract) => {
					const isSelected = contract.id === selectedContract.id;

					return (
						<CardListView.List.Item
							asChild
							key={contract.id}
							isSelected={isSelected}
						>
							<contractsRouteApi.Link
								to='.'
								search={(prev) => ({ ...prev, selectedContractId: contract.id })}
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
						</CardListView.List.Item>
					);
				})}

				<CardListView.List.CreateItem asChild>
					<button
						type='button'
						onClick={onCreateNewContract}
					>
						<PlusIcon className='size-4' />
						{t('contracts.list.addContract')}
					</button>
				</CardListView.List.CreateItem>
			</CardListView.List.Content>
		</CardListView.List.Root>
	);
};
