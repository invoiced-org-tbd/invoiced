import { PDFCanvasViewer } from '@/components/pdf-canvas-viewer/PDFCanvasViewer';
import { invoicePDFModelMap } from './invoiceModels';
import type { InvoicePDFProps } from './types';

export const InvoicePDF = ({
	model,
	contractData,
	company,
	issueDate,
}: InvoicePDFProps) => {
	if (typeof window === 'undefined') {
		return null;
	}

	const Model = invoicePDFModelMap[model] ?? invoicePDFModelMap['base-v0'];

	return (
		<PDFCanvasViewer className='bg-muted'>
			<Model
				contractData={contractData}
				company={company}
				issueDate={issueDate}
			/>
		</PDFCanvasViewer>
	);
};
