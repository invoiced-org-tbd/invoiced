import { mergeAttributes, Node } from '@tiptap/core';

export const emailMergeFieldName = 'emailMergeField';

export const EmailMergeField = Node.create({
	name: emailMergeFieldName,
	group: 'inline',
	inline: true,
	atom: true,
	selectable: true,
	draggable: false,

	addAttributes() {
		return {
			id: {
				default: null,
				parseHTML: (element) => element.getAttribute('data-email-var'),
				renderHTML: (attributes) => {
					if (!attributes.id) {
						return {};
					}
					return { 'data-email-var': attributes.id };
				},
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: 'span[data-email-var]',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'span',
			mergeAttributes(
				{
					class: 'email-merge-field',
				},
				HTMLAttributes,
			),
			0,
		];
	},
});
