export const enTranslations = {
	common: {
		name: 'Name',
		email: 'Email',
		submit: 'Submit',
		cancel: 'Cancel',
		clear: 'Clear',
		close: 'Close',
		edit: 'Edit',
		delete: 'Delete',
		goBack: 'Go back',
		logOut: 'Log out',
		lightMode: 'Light mode',
		darkMode: 'Dark mode',
		english: 'English',
		portuguese: 'Portuguese',
		yes: 'Yes',
		no: 'No',
		trueLabel: 'True',
		falseLabel: 'False',
		toggleOptions: 'Toggle options',
		selectAll: 'Select all',
		addItem: 'Add item',
		next: 'Next',
		unknownError: 'An unknown error occurred',
	},
	form: {
		unsavedChanges: {
			title: 'Unsaved changes',
			description: 'You have unsaved changes. Are you sure you want to leave?',
			discardAndLeave: 'Discard and leave',
			stay: 'Stay',
		},
	},
	countries: {
		notFound: 'Country {country} not found',
		unitedStates: 'United States',
		brazil: 'Brazil',
		canada: 'Canada',
		australia: 'Australia',
		unitedKingdom: 'United Kingdom',
		argentina: 'Argentina',
		portugal: 'Portugal',
		mexico: 'Mexico',
		germany: 'Germany',
		estonia: 'Estonia',
		austria: 'Austria',
		lithuania: 'Lithuania',
		netherlands: 'Netherlands',
	},
	entity: {
		notFound: '{entity} not found',
		deletedSuccess: '{entity} has been deleted',
		addTitle: 'Add {entity}',
		editTitle: 'Edit {entity}',
		deleteTitle: 'Delete {entity}',
		deleteConfirmation: 'Are you sure you want to delete this {entity}?',
	},
	validation: {
		required: 'This field is required',
		invalidType: 'Invalid value',
		invalidEmail: 'Please enter a valid email address',
		minCharacters: 'Please enter at least {minimum} characters',
		minNumber: 'Please enter a value greater than or equal to {minimum}',
		maxCharacters: 'Please enter at most {maximum} characters',
		maxNumber: 'Please enter a value less than or equal to {maximum}',
	},
	a11y: {
		inputAction: 'Input action',
		toggleSidebar: 'Toggle Sidebar',
		openColumnFilter: 'Open column filter',
		toggleColumnSorting: 'Toggle column sorting',
		selectPageSize: 'Select page size',
		goToPage: 'Go to page {page}',
		selectPage: 'Select page',
		removeOption: 'Remove {option}',
	},
	dataTable: {
		filter: {
			title: 'Filter',
			inputPlaceholder: 'Type to filter...',
			clearButton: 'Clear filter',
		},
		footer: {
			rows: 'Rows: {count}',
			rowsPerPage: 'Rows per page',
			page: 'Page {page}',
		},
		emptyMessage: 'No results.',
		rowActions: 'Row actions',
	},
	multiSelect: {
		placeholder: 'Select options...',
		searchPlaceholder: 'Search options...',
		more: '+{count} more',
	},
	select: {
		placeholder: 'Select an option...',
		emptyMessage: 'No options found',
	},
	account: {
		drawerTitle: 'Account',
		form: {
			emailDescription: 'Managed by your Google account',
			saveChanges: 'Save Changes',
		},
		dangerZone: {
			title: 'Danger Zone',
			description: 'Delete account permanently',
			intro: 'Before deleting your account, review what happens next:',
			itemDataRemoved:
				'All your profile data and saved preferences are removed.',
			itemSessionsSignedOut: 'Connected sessions are signed out immediately.',
			itemCannotUndo: 'This action cannot be undone after confirmation.',
			areYouSure: 'Are you sure?',
			deleteMyAccount: 'Delete my account',
			deleteAccount: 'Delete Account',
		},
	},
	auth: {
		dashboardTitle: 'Dashboard',
		sidebar: {
			management: 'Management',
			contracts: 'Contracts',
			invoices: 'Invoices',
			cashflow: 'Cash flow',
			settings: {
				group: 'Settings',
			},
		},
		server: {
			accountUpdatedSuccess: 'Your account has been updated',
		},
	},
	settings: {
		title: 'Settings',
		tabs: {
			account: {
				title: 'Account',
				description: 'Manage your account information.',
			},
			company: {
				title: 'Company',
				description: 'Manage your company information.',
				profile: {
					title: 'Company profile',
					description: 'Your workspace is linked to a single company record.',
					noAddress: 'Address not provided',
				},
				zeroState: {
					title: 'Create your company profile',
					description:
						'Set up your company once to unlock invoices and business details across the app.',
					primaryAction: 'Create company',
				},
				drawer: {
					title: 'Create company',
					description: 'Add your company details to continue your setup.',
					editTitle: 'Edit company',
					editDescription: 'Update your company details and address.',
					saveAction: 'Save changes',
				},
			},
			automations: {
				title: 'Automations',
				description: 'Configure SMTP providers and email templates.',
				actions: {
					add: 'Add',
					duplicate: 'Duplicate',
				},
				copySuffix: '(copy)',
				smtp: {
					title: 'SMTP configurations',
					description: 'Manage your outgoing email providers.',
					senderLabel: 'Sender email',
					hostLabel: 'Host / Port',
					presets: {
						label: 'Provider preset',
						description: 'Pick a provider to prefill host, port, and security.',
						placeholder: 'Select a provider...',
						applyAction: 'Apply preset',
						providers: {
							gmail: 'Gmail',
							outlook: 'Outlook (Microsoft 365)',
							mailgun: 'Mailgun',
							sendgrid: 'SendGrid',
						},
					},
					securityModes: {
						starttls: 'STARTTLS',
						sslTls: 'SSL/TLS',
						none: 'None',
					},
					emptyState: {
						title: 'No SMTP configuration yet',
						description:
							'Add your first SMTP provider to start sending transactional emails.',
					},
					deleteBlockedByContractAutoSend:
						"This SMTP configuration is used by a contract's invoice auto-send settings. Disable or change auto-send on those contracts before deleting.",
					drawer: {
						title: 'Create SMTP configuration',
						description: 'Define host, sender, and security settings.',
						editTitle: 'Edit SMTP configuration',
						editDescription: 'Update SMTP connection and sender details.',
						createAction: 'Create SMTP',
						saveAction: 'Save changes',
					},
					form: {
						nameLabel: 'Configuration name',
						namePlaceholder: 'Primary SMTP',
						usernameLabel: 'Username',
						usernamePlaceholder: 'smtp-user',
						usernameHint:
							'Usually your SMTP login, often an email or provider username.',
						fromNameLabel: 'Sender name',
						fromNamePlaceholder: 'Billing Team',
						fromEmailLabel: 'Sender email',
						fromEmailPlaceholder: 'billing@acme.com',
						fromEmailHint:
							'The address recipients will see as the sender in their inbox.',
						hostLabel: 'Host',
						hostPlaceholder: 'smtp.mailgun.org',
						hostHint: 'SMTP server host provided by your email provider.',
						portLabel: 'Port',
						portHint:
							'Common ports: 587 (STARTTLS), 465 (SSL/TLS), or 25 (no encryption).',
						securityLabel: 'Security',
						securityHint:
							'Match this with your provider settings. STARTTLS is most common.',
						passwordLabel: 'Password',
						passwordPlaceholder: 'Type your SMTP password',
						passwordDescription: 'Stored securely and never shown again.',
						passwordEditPlaceholder: 'Leave blank to keep current password',
						passwordEditDescription:
							'For security, we never reveal the current password.',
					},
				},
				emailTemplates: {
					title: 'Email templates',
					description: 'Create and maintain reusable email templates.',
					subjectLabel: 'Subject preview',
					updatedAtLabel: 'Updated at',
					emptyState: {
						title: 'No email templates yet',
						description:
							'Create your first template to standardize invoice communication.',
					},
					deleteBlockedByContractAutoSend:
						"This template is used by a contract's invoice auto-send settings. Disable or change auto-send on those contracts before deleting.",
					drawer: {
						title: 'Create email template',
						description: 'Define template type and subject.',
						editTitle: 'Edit email template',
						editDescription: 'Adjust template details and status.',
						createAction: 'Create template',
						saveAction: 'Save changes',
					},
					form: {
						nameLabel: 'Template name',
						namePlaceholder: 'Invoice reminder',
						slugLabel: 'Slug',
						slugPlaceholder: 'invoice-reminder',
						subjectLabel: 'Subject',
						subjectPlaceholder: 'Reminder: your invoice is due soon',
						bodyLabel: 'Body',
						bodyPlaceholder: 'Hello client, your invoice is ready.',
					},
				},
			},
			notifications: {
				title: 'Notifications',
				description: 'Manage your notifications.',
			},
			billingPlans: {
				title: 'Billing & Plans',
				description:
					'Review your active plan, payment method, and recent invoices.',
				paymentMethod: {
					title: 'Selected payment method',
					description: 'This is the card used for your subscription renewals.',
					methodLabel: 'Card',
					defaultBadge: 'Default',
					holderLabel: 'Card holder',
					expiresLabel: 'Expires',
				},
				selectedPlan: {
					title: 'Selected plan',
					description: 'Overview of your current subscription plan.',
					planLabel: 'Plan',
					activeBadge: 'Active',
					priceLabel: 'Price',
					renewalLabel: 'Renews on',
				},
				history: {
					title: 'Billing history',
					description: 'Track your monthly billing activity.',
					period: 'Period',
					invoice: 'Invoice',
					issuedAt: 'Issued at',
					amount: 'Amount',
					status: 'Status',
					statuses: {
						paid: 'Paid',
						processing: 'Processing',
						pending: 'Pending',
						failed: 'Failed',
					},
				},
			},
		},
	},
	createCompany: {
		form: {
			nameLabel: 'Company Name',
			namePlaceholder: 'Acme Inc.',
			nameDescription: 'Use your business name',
			emailPlaceholder: 'john@acmeinc.com',
			addressSectionTitle: 'Address',
			street1Label: 'Street',
			street1Placeholder: 'Main St',
			street2Label: 'Address line 2',
			street2Placeholder: 'Apt, suite, unit, building, floor',
			numberLabel: 'Number',
			numberPlaceholder: '123',
			postalCodeLabel: 'Postal code',
			postalCodePlaceholder: '10001',
			cityLabel: 'City',
			cityPlaceholder: 'New York',
			stateLabel: 'State',
			statePlaceholder: 'NY',
			countryLabel: 'Country',
			countryPlaceholder: 'United States',
			submit: 'Create Company',
		},
	},
	root: {
		notFound: 'Not Found',
		error: 'Error',
	},
	dashboard: {
		message: 'Welcome back, {name}.',
	},
	contracts: {
		name: 'Contract',
		title: 'Contracts',
		list: {
			addContract: 'Add Contract',
			createInvoice: 'Create Invoice',
			pageDescription:
				'A cleaner view for your contracts, designed for one or many clients.',
			listDescription: 'Pick a contract to view details on the right panel.',
			count: '{count} total',
			singleLabel: 'Current contract',
			singleBadge: 'Selected',
			emptyBadge: 'No contracts yet',
			emptyTitle: 'Start with your first contract',
			emptyDescription:
				'Add a contract to unlock billing workflows and automate your invoices.',
			emptyCta: 'Create contract',
			recurrenceValue: '{count} recurrence item(s)',
			autoSendOn: 'Auto-send enabled',
			autoSendOff: 'Auto-send disabled',
			roleLabel: 'Role',
			updatedAtLabel: 'Last update',
			financialDetails: 'Financial Details',
			monthlyRate: 'Monthly Rate',
			billingContact: 'Billing Contact',
			addressLabel: 'Address',
			paymentSchedule: 'Payment Schedule',
			recurrenceEveryLabel: 'Every',
			recurrenceDayLabel: 'Day',
		},
		zeroState: {
			withCompany: {
				badge: 'No contracts yet',
				title: 'Start with your first contract',
				description:
					'Pick a client, define how often invoices run, and choose when they are sent. You can change these details later.',
				cta: 'Create your first contract',
				ariaConfigure: 'What you will configure',
				roleTitle: 'Your role',
				roleDescription: 'How you are listed on this contract.',
				clientProjectTitle: 'Client & project',
				clientProjectDescription: 'Who is billed and what the work is called.',
				scheduleSendingTitle: 'Schedule & sending',
				scheduleSendingDescription:
					'How often invoices run and whether they are emailed automatically.',
			},
			withoutCompany: {
				badge: 'Company required',
				title: 'Set up your company first',
				description:
					'Contracts need a company profile so invoices show the right legal name, email, and address. Add yours in settings, then come back here.',
				cta: 'Set up your company',
				ariaNextSteps: 'Next steps',
				step1Label: 'Step 1',
				step1Title: 'Company',
				step1Description: 'Name, contact email, and billing address.',
				step2Label: 'Step 2',
				step2Title: 'First contract',
				step2Description:
					'Client, schedule, and invoice rules, after your company exists.',
			},
		},
		form: {
			role: {
				descriptionLabel: 'Role Description',
				rateLabel: 'Rate',
			},
			invoiceRecurrence: {
				sectionTitle: 'Invoice Recurrence',
				sectionDescription: 'Define the invoice recurrence for the contract.',
				dayOfMonthLabel: 'Day of Month',
				dayOfMonthSuffix: '{suffix} day of month',
				percentageLabel: 'Percentage',
				totalPercentageLabel: 'Total percentage: {value}%',
				totalPercentageInvalidHint: '(must be 100%)',
				balancePercentagesLabel: 'Balance percentages',
				balancePercentagesTooltip:
					'Automatically balance percentages to 100% when adding or removing items',
				validation: {
					totalPercentageMustBe100: 'Total percentage must be 100',
					duplicateDayOfMonth: 'Duplicate day of month',
				},
			},
			client: {
				companyNameLabel: 'Company Name',
				responsibleNameLabel: 'Responsible Name',
				responsibleEmailLabel: 'Responsible Email',
				address: {
					sectionTitle: 'Client Address',
					street1Label: 'Street',
					street2Label: 'Address Complement',
					numberLabel: 'Number',
					postalCodeLabel: 'Postal code',
					cityLabel: 'City',
					stateLabel: 'State',
					countryLabel: 'Country',
				},
			},
			autoSend: {
				sectionTitle: 'Invoice auto-send',
				sectionDescription:
					'Send invoices by email automatically using your SMTP and templates configurations.',
				loading: 'Loading automation settings…',
				zeroState: {
					title: 'SMTP or email templates are missing',
					description:
						'Add at least one SMTP configuration and one email template in Settings > Automations before you can enable auto-send.',
					cta: 'Open Automations',
				},
				enabledLabel: 'Enable auto-send',
				enabledDescription:
					'When enabled, invoices for this contract can be emailed using the selections below.',
				smtpLabel: 'SMTP configuration',
				smtpDescription: 'Outbound mail server used to send invoice emails.',
				smtpPlaceholder: 'Select SMTP',
				templateLabel: 'Email template',
				templateDescription:
					'Template applied to the body and subject of invoice emails.',
				templatePlaceholder: 'Select template',
				validation: {
					smtpRequired:
						'Select an SMTP configuration when auto-send is enabled.',
					templateRequired:
						'Select an email template when auto-send is enabled.',
				},
				invalidSmtpConfiguration:
					'The selected SMTP configuration was not found or does not belong to your account.',
				invalidEmailTemplate:
					'The selected email template was not found or does not belong to your account.',
			},
		},
		tabs: {
			role: 'Role',
			client: 'Client',
			invoiceRecurrence: 'Invoice Recurrence',
			autoSend: 'Auto-send',
		},
		summary: {
			title: 'Contract summary',
			description:
				'Review the contract details below before submitting your changes.',
			badge: 'Review',
			activeContractLabel: 'Active contract',
			activeContractValue:
				'You have an active contract with {companyName} as {roleDescription}.',
			activeContractMissing:
				'The client company and role are not fully defined yet.',
			salaryLabel: 'Salary',
			salaryMissing: 'Salary has not been set yet.',
			billingLabel: 'Billing contact',
			billingValue: 'Invoices will be sent to {name} ({email}).',
			billingMissing:
				'Billing contact details are still missing for this contract.',
			missingInformationHint:
				'Add this information to make the summary complete.',
			autoSendLabel: 'Auto-send',
			autoSendValue: '{smtpName} · template "{templateName}"',
			autoSendOff: 'Auto-send is off for this contract.',
			autoSendIncomplete:
				'Select both SMTP and a template to finish auto-send.',
			autoSendIncompleteHint:
				'Open the Auto-send step and pick an SMTP configuration and email template.',
		},
		invoicePreview: {
			previewButton: 'Preview PDF',
			title: 'Invoice Preview',
			description: 'This preview updates from your current form values.',
			incompleteFieldsHint:
				'Some fields are incomplete. Preview may show placeholders.',
		},
		invoiceConfigurationSetup: {
			title: 'Invoice file name and numbering',
			introLead:
				'This is your first contract. Choose how generated invoice file names are built and which number to continue from.',
			introExisting:
				'If you already issue invoices outside the app, use the same pattern and enter your last invoice number so numbering stays continuous.',
			patternSectionTitle: 'Prefix and suffix',
			includeSectionTitle: 'Include in file name',
			previewCaption: 'Example file name',
			numberingSectionTitle: 'Numbering',
			prefixLabel: 'Prefix',
			suffixLabel: 'Suffix',
			withYearLabel: 'Year',
			withMonthLabel: 'Month',
			withDayLabel: 'Day',
			withCompanyNameLabel: 'Company name',
			lastInvoiceNumberLabel: 'Last invoice number',
			numberingTabNewLabel: 'Starting fresh',
			numberingTabExistingLabel: 'Already invoicing elsewhere',
			numberingNewTabHint:
				'Your first invoice in the app will start at number 1.',
			numberingExistingTabHint:
				'Enter the last invoice number you used outside the app so the next one continues the sequence.',
			finishSetup: 'Finish setup',
			alreadyExistsForUser:
				'There is already an invoice configuration for this user.',
		},
	},
	invoices: {
		name: 'Invoice',
		title: 'Invoices',
		list: {
			emptyState: 'No invoices yet.',
			createInvoice: 'Create invoice',
			viewInvoice: 'View invoice',
			deleteInvoice: 'Delete invoice',
			itemSingular: 'item',
			itemPlural: 'items',
			itemsCount: '{count} items',
			sections: {
				financial: 'Financial',
				client: 'Client',
				issue: 'Issue',
				items: 'Items',
			},
			labels: {
				totalAmount: 'Total amount',
				company: 'Company',
				issueDate: 'Issue date',
				invoiceItem: 'Invoice item',
			},
			noItems: 'No items on this invoice.',
		},
		creation: {
			drawerTitle: 'Invoice Creation',
			form: {
				recurrenceLabel: 'Recurrence',
			},
			validation: {
				itemsRequiredInCustomMode: 'Items are required in custom mode',
			},
		},
		server: {
			invoiceConfigurationRequired:
				'Please set up your invoice configuration before creating invoices',
			recurrenceItemNotFound: 'Recurrence item not found',
			notFound: 'Invoice not found',
			deletedSuccess: 'Invoice deleted',
		},
	},
	onboarding: {
		title: 'Onboarding',
		completed: '{completed}/{total} completed',
		sections: {
			coreSetup: 'Core setup',
			advancedSetup: 'Advanced setup',
		},
		actions: {
			dismiss: 'Dismiss onboarding',
			open: 'Open',
			markAsDone: 'Mark as done',
			markAsNotDone: 'Mark as not done',
		},
		steps: {
			company: {
				label: 'Create your Company',
				description: 'Set your business profile and legal details.',
			},
			contract: {
				label: 'Add your first Contract',
				description: 'Create at least one contract to start billing.',
			},
			invoice: {
				label: 'Send an Invoice',
				description: 'Mark this when your first invoice is sent.',
			},
			smtp: {
				label: 'Setup SMTP',
				description: 'Configure your SMTP provider for outbound email.',
			},
			emailTemplates: {
				label: 'Setup email templates',
				description: 'Define your default invoice email templates.',
			},
		},
	},
	pdfCanvasViewer: {
		loading: {
			generatingPreview: 'Generating PDF preview...',
		},
		error: {
			renderFailed: 'Could not render PDF preview.',
			unavailable: 'PDF preview is unavailable right now.',
		},
	},
} as const;
