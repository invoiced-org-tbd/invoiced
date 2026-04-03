import type { GetContractsResponse } from '@/api/contract/getContracts';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { useLanguage } from '@/hooks/use-language/useLanguage';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { formatUpdatedAt } from '@/utils/dateUtils';
import { getRouteApi } from '@tanstack/react-router';
import { TrashIcon } from 'lucide-react';

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

type ContractCardFooterProps = {
	contract: GetContractsResponse[number];
};
export const ContractCardFooter = ({ contract }: ContractCardFooterProps) => {
	const { t } = useTranslate();
	const { language } = useLanguage();

	return (
		<Card.Footer className='flex-row justify-between items-center border-t pt-5 mx-2 px-2'>
			<div>
				<p className='text-xs text-muted-foreground'>
					{t('contracts.list.updatedAtLabel')}:{' '}
					{formatUpdatedAt({ date: contract.updatedAt, language })}
				</p>
			</div>

			<div>
				<contractsRouteApi.Link
					to='.'
					search={(prev) => ({ ...prev, isDeleting: true })}
				>
					<Button
						variant='destructive'
						size='xxs'
						isOutlined
					>
						<TrashIcon />
						{t('common.delete')}
					</Button>
				</contractsRouteApi.Link>
			</div>
		</Card.Footer>
	);
};
