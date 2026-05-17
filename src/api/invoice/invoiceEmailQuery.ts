export const invoiceForEmailQueryWith = {
	items: true,
	contract: {
		with: {
			client: {
				with: {
					address: true,
				},
			},
			original: {
				with: {
					autoSend: {
						with: {
							emailTemplate: true,
						},
					},
				},
			},
		},
	},
	invoiceConfiguration: true,
} as const;
