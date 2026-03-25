import { pdf } from '@react-pdf/renderer';
import {
	SpecialZoomLevel,
	Viewer as PdfJsViewer,
	Worker as PdfJsWorker,
} from '@react-pdf-viewer/core';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { useEffect, useRef, useState } from 'react';
import pdfJsWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';
import '@react-pdf-viewer/core/lib/styles/index.css';
import './pdf-canvas-viewer.css';
import type { PDFCanvasViewerProps } from './types';

export const PDFCanvasViewer = ({
	children,
	className,
}: PDFCanvasViewerProps) => {
	const { t } = useTranslate();
	const [fileUrl, setFileUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const activeUrlRef = useRef<string | null>(null);

	useEffect(() => {
		let isDisposed = false;

		const renderPdf = async () => {
			setIsLoading(true);
			setErrorMessage(null);

			try {
				const pdfBlob = await pdf(children).toBlob();
				const nextUrl = URL.createObjectURL(pdfBlob);

				if (isDisposed) {
					URL.revokeObjectURL(nextUrl);
					return;
				}

				if (activeUrlRef.current) {
					URL.revokeObjectURL(activeUrlRef.current);
				}

				activeUrlRef.current = nextUrl;
				setFileUrl(nextUrl);
			} catch (error) {
				setErrorMessage(
					error instanceof Error
						? error.message
						: t('pdfCanvasViewer.error.renderFailed'),
				);
				setFileUrl(null);
			} finally {
				if (!isDisposed) {
					setIsLoading(false);
				}
			}
		};

		renderPdf();

		return () => {
			isDisposed = true;
		};
	}, [children, t]);

	useEffect(() => {
		return () => {
			if (activeUrlRef.current) {
				URL.revokeObjectURL(activeUrlRef.current);
				activeUrlRef.current = null;
			}
		};
	}, []);

	if (isLoading) {
		return (
			<div className='h-full rounded-lg bg-background p-4 text-sm text-muted-foreground'>
				{t('pdfCanvasViewer.loading.generatingPreview')}
			</div>
		);
	}

	if (errorMessage || !fileUrl) {
		return (
			<div className='h-full rounded-lg bg-background p-4 text-sm text-muted-foreground'>
				{errorMessage ?? t('pdfCanvasViewer.error.unavailable')}
			</div>
		);
	}

	return (
		<div
			className={
				className ??
				'pdf-canvas-viewer h-full w-full rounded-lg bg-transparent overflow-hidden'
			}
		>
			<PdfJsWorker workerUrl={pdfJsWorkerUrl}>
				<PdfJsViewer
					fileUrl={fileUrl}
					defaultScale={SpecialZoomLevel.PageFit}
					renderLoader={() => <></>}
				/>
			</PdfJsWorker>
		</div>
	);
};
