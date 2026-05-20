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
		open: 'Open',
		unknownError: 'An unknown error occurred',
		loading: 'Loading…',
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
	richTextField: {
		toolbar: {
			label: 'Formatting',
			bold: 'Bold',
			italic: 'Italic',
			underline: 'Underline',
			bulletList: 'Bullet list',
			orderedList: 'Ordered list',
		},
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
				entityName: 'company',
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
			invoice: {
				title: 'Invoice',
				description:
					'Global settings for generated invoice file names and numbering.',
				entityName: 'invoice configuration',
				saveChanges: 'Save changes',
				previewCompanyPlaceholder: 'Company',
				profile: {
					title: 'Invoice file name and numbering',
					description:
						'How generated invoice file names are built and how numbering continues.',
					emptyText: '—',
				},
				editDialog: {
					title: 'Edit invoice file name and numbering',
					description:
						'Update prefix, suffix, parts of the file name, and invoice numbering.',
				},
				zeroState: {
					title: 'Invoice naming not configured yet',
					description:
						'File name and numbering are set when you create your first contract. Open contracts to finish setup.',
					primaryAction: 'Go to contracts',
				},
			},
			automations: {
				title: 'Automations',
				description: 'Configure email templates for automated invoice emails.',
				actions: {
					add: 'Add',
					duplicate: 'Duplicate',
				},
				copySuffix: '(copy)',
				emailTemplates: {
					title: 'Email templates',
					description: 'Create and maintain reusable email templates.',
					entityName: 'email template',
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
						duplicateTitle: 'Duplicate email template',
						duplicateDescription: 'Create a copy from an existing template.',
						createAction: 'Create template',
						saveAction: 'Save changes',
					},
					feedback: {
						duplicateSuccess: 'Email template duplicated successfully',
					},
					errors: {
						createFailed: 'Failed to create email template',
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
				description: 'Review your active plan and manage your subscription.',
				noSubscription: 'No active subscription. Choose a plan to continue.',
				cancelSubscription: 'Cancel subscription',
				cancelSuccess: 'Subscription cancelled successfully.',
				cancelError: 'Could not cancel subscription.',
				changePlan: 'Switch to {plan}',
				changePlanSuccess: 'Plan change scheduled for the next billing cycle.',
				changePlanError: 'Could not change plan.',
				statuses: {
					active: 'Active',
					trialing: 'Trial',
					cancelled: 'Cancelled',
					pastDue: 'Past due',
				},
				selectedPlan: {
					title: 'Current plan',
					description: 'Overview of your subscription.',
					planLabel: 'Plan',
					priceLabel: 'Price',
					month: 'month',
					renewalLabel: 'Renews on',
					trialEndsLabel: 'Trial ends on',
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
					'Send invoices by email automatically using Resend and your email templates.',
				loading: 'Loading automation settings…',
				zeroState: {
					title: 'Email templates are missing',
					description:
						'Add at least one email template in Settings > Automations before you can enable auto-send.',
					cta: 'Open Automations',
				},
				enabledLabel: 'Enable auto-send',
				enabledDescription:
					'When enabled, invoices for this contract can be emailed using the template below.',
				templateLabel: 'Email template',
				templateDescription:
					'Template applied to the body and subject of invoice emails.',
				templatePlaceholder: 'Select template',
				validation: {
					templateRequired:
						'Select an email template when auto-send is enabled.',
				},
				invalidEmailTemplate:
					'The selected email template was not found or does not belong to your account.',
				proOnly: {
					title: 'Pro plan feature',
					description:
						'Automatic invoice sending is available on the Pro plan. Upgrade in Billing & Plans.',
				},
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
			autoSendValue: 'Template "{templateName}"',
			autoSendOff: 'Auto-send is off for this contract.',
			autoSendIncomplete: 'Select an email template to finish auto-send.',
			autoSendIncompleteHint:
				'Open the Auto-send step and pick an email template.',
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
		server: {
			companySetupRequiredBeforeCreate:
				'Please setup your company before creating a contract.',
			companySetupRequiredBeforeUpdate:
				'Please setup your company before updating a contract.',
		},
	},
	invoices: {
		name: 'Invoice',
		title: 'Invoices',
		list: {
			emptyState: 'No invoices yet.',
			emptyStateDescription:
				'Create an invoice from a contract on the Contracts page.',
			createInvoice: 'Create invoice',
			viewInvoice: 'View invoice',
			sendToAccounting: 'Send to accounting',
			downloadInvoice: 'Download invoice',
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
		emailToAccounting: {
			subject: 'Invoice: {fileName}',
			bodyText:
				'Please find the invoice PDF ({fileName}) attached for {clientCompany}.',
			bodyHtml:
				'<p>Please find the invoice PDF (<strong>{fileName}</strong>) attached for <strong>{clientCompany}</strong>.</p>',
		},
		server: {
			invoiceConfigurationRequired:
				'Please set up your invoice configuration before creating invoices',
			recurrenceItemNotFound: 'Recurrence item not found',
			notFound: 'Invoice not found',
			deletedSuccess: 'Invoice deleted',
			sendToAccountingSuccess: 'Invoice PDF sent to {email}.',
			resendNotConfigured:
				'Email sending is not configured. Add RESEND_API_KEY to your server environment.',
			invalidResponsibleEmail:
				'The contract billing contact email is missing or invalid. Update the responsible email on the contract.',
			companyRequiredForEmail:
				'Set up your company before sending invoice emails.',
			emailProviderError:
				'The email provider could not send this message. Try again later.',
			resendSandboxRecipient:
				'Resend test mode only delivers to your Resend account email. Verify a domain at resend.com/domains, set RESEND_FROM to that domain, or use your account email as the contract responsible email while testing.',
			autoSendNotConfigured:
				'This invoice’s contract does not have invoice auto-send configured with an email template.',
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
			emailTemplates: {
				label: 'Setup email templates',
				description: 'Define your default invoice email templates.',
			},
		},
	},
	planSelection: {
		title: 'Choose your plan',
		description:
			'Select the plan that fits your billing workflow. You can change anytime.',
		trialBadge: '7-day free trial on all plans',
		recommended: 'Recommended',
		perMonth: '/month',
		ctaStarter: 'Subscribe to Starter',
		ctaPro: 'Subscribe to Pro',
		checkoutError: 'Could not start checkout. Please try again.',
		features: {
			starter: {
				contract: '1 active contract',
				manualSend: 'Manual invoice sending',
				miniErp: 'Integrated mini ERP',
			},
			pro: {
				unlimitedContracts: 'Unlimited contracts',
				autoSend: 'Automatic invoice sending',
				miniErp: 'Integrated mini ERP',
			},
		},
	},
	subscription: {
		server: {
			subscriptionRequired:
				'An active subscription is required to use Invoiced.',
			contractLimitReached:
				'Your plan allows only 1 active contract. Upgrade to Pro.',
			autoSendProOnly: 'Auto-send is only available on the Pro plan.',
			noActiveSubscription: 'No active subscription found.',
			cancelled: 'Subscription cancelled.',
			alreadyOnPlan: 'You are already on this plan.',
			planChangeScheduled: 'Plan change scheduled.',
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
