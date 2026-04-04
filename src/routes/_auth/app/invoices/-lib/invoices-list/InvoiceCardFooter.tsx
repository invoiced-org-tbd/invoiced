import { Card } from '@/components/card/Card';
import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/button/Button';
import { useTranslate } from '@/hooks/use-translate/useTranslate';

export const InvoiceCardFooter = () => {
	const { t } = useTranslate();

	return (
		<Card.Footer className='flex-row justify-between items-center border-t pt-5 mx-2 px-2'>
			<div></div>

			<div>
				<Button
					variant='destructive'
					size='xxs'
					isOutlined
				>
					<TrashIcon />
					{t('invoices.list.deleteInvoice')}
				</Button>
			</div>
		</Card.Footer>
	);
};
