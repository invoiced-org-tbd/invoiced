import type { GetContractsResponse } from '@/api/contract/getContracts';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';
import { Building2Icon, PencilIcon, ReceiptTextIcon } from 'lucide-react';

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

type ContractCardHeaderProps = {
	contract: GetContractsResponse[number];
};
export const ContractCardHeader = ({ contract }: ContractCardHeaderProps) => {
	const { t } = useTranslate();

	return (
		<Card.Header className='border-b flex-row justify-between items-center'>
			<div className='flex items-center gap-2'>
				<div className='bg-primary/10 text-primary-muted rounded-lg p-2'>
					<Building2Icon
						className='size-8'
						strokeWidth={1.4}
					/>
				</div>

				<div className='flex flex-col'>
					<p className='font-medium leading-4'>{contract.client.companyName}</p>
					<p className='text-sm text-muted-foreground'>
						{contract.role.description}
					</p>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				<contractsRouteApi.Link
					to='.'
					search={(prev) => ({ ...prev, isEditing: true })}
				>
					<Button
						variant='secondary'
						size='xs'
					>
						<PencilIcon />
						{t('common.edit')}
					</Button>
				</contractsRouteApi.Link>

				<contractsRouteApi.Link
					to='.'
					search={(prev) => ({ ...prev, isCreatingInvoice: true })}
				>
					<Button
						variant='primary'
						size='xs'
					>
						<ReceiptTextIcon />
						{t('contracts.list.createInvoice')}
					</Button>
				</contractsRouteApi.Link>
			</div>
		</Card.Header>
	);
};
