import type { Extension } from '@tiptap/core';
import type { Editor } from '@tiptap/react';
import type { ReactNode } from 'react';
import type { BaseFieldInputProps } from '../base-field/types';

export type RichTextFieldProps = BaseFieldInputProps<string> & {
	placeholder?: string;
	extensions?: Extension[];
	toolbarRightSlot?: (editor: Editor) => ReactNode;
	parseValue?: (value: string) => string;
	serializeHtml?: (html: string) => string;
};
