import { PDFCanvasViewer } from '@/components/pdf-canvas-viewer/PDFCanvasViewer';
import { invoicePDFModelMap } from './invoiceModels';
import type { InvoicePDFProps } from './types';

export const InvoicePDF = ({ model, data, className }: InvoicePDFProps) => {
	if (typeof window === 'undefined') {
		return null;
	}

	const Model = invoicePDFModelMap[model] ?? invoicePDFModelMap['base-v0'];

	return (
		<PDFCanvasViewer className={className}>
			<Model data={data} />
		</PDFCanvasViewer>
	);
};
