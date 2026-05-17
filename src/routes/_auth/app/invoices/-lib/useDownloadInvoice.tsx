import type { GetCompanyResponse } from '@/api/company/getCompany';
import type { GetInvoicesResponse } from '@/api/invoice/getInvoices';
import { invoicePDFModelMap } from '@/components/invoice-pdf/invoiceModels';
import type { InvoicePDFData } from '@/components/invoice-pdf/types';
import { useCompany } from '@/hooks/use-company/useCompany';
import { assertCompany } from '@/utils/typesUtils';
import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';

const toInvoicePDFData = (
	invoice: GetInvoicesResponse[number],
	company: NonNullable<GetCompanyResponse>,
): InvoicePDFData => {
	return {
		from: {
			name: company.name,
			email: company.email,
			address: company.address,
		},
		to: {
			name: invoice.contract.client.companyName,
			email: invoice.contract.client.responsibleEmail,
			address: invoice.contract.client.address,
		},
		items: invoice.items.map((item) => ({
			description: item.description,
			rate: item.amount,
		})),
		issueDate: invoice.issueDate,
		invoiceNumber: invoice.invoiceConfiguration.lastInvoiceNumber,
	};
};

export const useDownloadInvoice = () => {
	const { company } = useCompany();
	const [isDownloading, setIsDownloading] = useState(false);

	const downloadInvoice = async (invoice: GetInvoicesResponse[number]) => {
		assertCompany(company);
		setIsDownloading(true);

		try {
			const data = toInvoicePDFData(invoice, company);

			const Model = invoicePDFModelMap['base-v0'];
			const blob = await pdf(<Model data={data} />).toBlob();

			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = invoice.fileName;
			a.click();
			URL.revokeObjectURL(url);
		} finally {
			setIsDownloading(false);
		}
	};

	return { downloadInvoice, isDownloading };
};
