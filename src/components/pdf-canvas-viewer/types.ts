import type { DocumentProps } from '@react-pdf/renderer';
import type { ReactElement } from 'react';

export type PDFCanvasViewerProps = {
	children: ReactElement<DocumentProps>;
	className?: string;
};
