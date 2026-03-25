import { PDFCanvasViewer } from '@/components/pdf-canvas-viewer';
import { invoicePDFModelMap } from './invoiceModels';
import type { InvoicePDFProps } from './types';

export const InvoicePDF = ({
	model,
	contractData,
	company,
}: InvoicePDFProps) => {
	const Model = invoicePDFModelMap[model] ?? invoicePDFModelMap['base-v0'];

	return (
		<PDFCanvasViewer>
			<Model
				contractData={contractData}
				company={company}
			/>
		</PDFCanvasViewer>
	);
};
