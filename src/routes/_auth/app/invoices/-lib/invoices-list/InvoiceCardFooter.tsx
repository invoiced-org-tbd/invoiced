import { Card } from '@/components/card/Card';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/button/Button';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { getRouteApi } from '@tanstack/react-router';

const invoicesRouteApi = getRouteApi('/_auth/app/invoices/');

export const InvoiceCardFooter = () => {
	const { t } = useTranslate();

	return (
		<Card.Footer className='flex-row justify-between items-center border-t pt-5 mx-2 px-2'>
			<div></div>

			<div>
				<invoicesRouteApi.Link
					to='.'
					search={(prev) => ({ ...prev, isDeletingInvoice: true })}
				>
					<Button
						variant='destructive'
						size='xxs'
						isOutlined
					>
						<TrashIcon />
						{t('invoices.list.deleteInvoice')}
					</Button>
				</invoicesRouteApi.Link>
			</div>
		</Card.Footer>
	);
};
