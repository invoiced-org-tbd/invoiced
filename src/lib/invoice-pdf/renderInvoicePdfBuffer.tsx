import '@tanstack/react-start/server-only';

import { pdf } from '@react-pdf/renderer';
import { InvoicePdfDocumentBaseV0 } from '@/components/invoice-pdf/invoiceModels';
import type { InvoicePDFData } from '@/components/invoice-pdf/types';
import { getInvoicePdfCountryName } from './invoicePdfLocale';

export const renderInvoicePdfBuffer = async (
	invoicePdfData: InvoicePDFData,
): Promise<Buffer> => {
	const blob = await pdf(
		<InvoicePdfDocumentBaseV0
			data={invoicePdfData}
			getCountryName={getInvoicePdfCountryName}
		/>,
	).toBlob();

	return Buffer.from(await blob.arrayBuffer());
};
