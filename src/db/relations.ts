import { defineRelations } from 'drizzle-orm';
import * as dbTables from './tables/dbTables';

export const relations = defineRelations(dbTables, (r) => ({
	companyTable: {
		owner: r.one.userTable({
			from: r.companyTable.userId,
			to: r.userTable.id,
			optional: false,
		}),
		address: r.one.companyAddressTable({
			from: r.companyTable.id,
			to: r.companyAddressTable.companyId,
			optional: false,
		}),
	},

	userTable: {
		contracts: r.many.contractTable({
			from: r.userTable.id,
			to: r.contractTable.userId,
		}),
		invoiceConfiguration: r.one.invoiceConfigurationTable({
			from: r.userTable.id,
			to: r.invoiceConfigurationTable.userId,
			optional: true,
		}),
		invoices: r.many.invoiceTable({
			from: r.userTable.id,
			to: r.invoiceTable.userId,
		}),
		smtpConfigs: r.many.smtpConfigTable({
			from: r.userTable.id,
			to: r.smtpConfigTable.userId,
		}),
		emailTemplates: r.many.emailTemplateTable({
			from: r.userTable.id,
			to: r.emailTemplateTable.userId,
		}),
	},

	contractTable: {
		client: r.one.contractClientTable({
			from: r.contractTable.id,
			to: r.contractClientTable.contractId,
			optional: false,
		}),
		role: r.one.contractRoleTable({
			from: r.contractTable.id,
			to: r.contractRoleTable.contractId,
			optional: false,
		}),
		invoiceRecurrence: r.one.contractInvoiceRecurrenceTable({
			from: r.contractTable.id,
			to: r.contractInvoiceRecurrenceTable.contractId,
			optional: false,
		}),
		autoSend: r.one.contractAutoSendTable({
			from: r.contractTable.id,
			to: r.contractAutoSendTable.contractId,
			optional: true,
		}),
	},

	contractInvoiceRecurrenceTable: {
		items: r.many.contractInvoiceRecurrenceItemTable({
			from: r.contractInvoiceRecurrenceTable.id,
			to: r.contractInvoiceRecurrenceItemTable.contractInvoiceRecurrenceId,
		}),
	},

	contractAutoSendTable: {
		smtpConfig: r.one.smtpConfigTable({
			from: r.contractAutoSendTable.smtpConfigId,
			to: r.smtpConfigTable.id,
			optional: false,
		}),
		emailTemplate: r.one.emailTemplateTable({
			from: r.contractAutoSendTable.emailTemplateId,
			to: r.emailTemplateTable.id,
			optional: false,
		}),
	},

	smtpConfigTable: {
		contractAutoSends: r.many.contractAutoSendTable({
			from: r.smtpConfigTable.id,
			to: r.contractAutoSendTable.smtpConfigId,
		}),
	},

	emailTemplateTable: {
		contractAutoSends: r.many.contractAutoSendTable({
			from: r.emailTemplateTable.id,
			to: r.contractAutoSendTable.emailTemplateId,
		}),
	},

	contractClientTable: {
		address: r.one.contractClientAddressTable({
			from: r.contractClientTable.id,
			to: r.contractClientAddressTable.contractClientId,
			optional: false,
		}),
	},

	invoiceTable: {
		items: r.many.invoiceItemsTable({
			from: r.invoiceTable.id,
			to: r.invoiceItemsTable.invoiceId,
		}),
		contract: r.one.contractSnapshotTable({
			from: r.invoiceTable.id,
			to: r.contractSnapshotTable.invoiceId,
			optional: false,
		}),
		invoiceConfiguration: r.one.invoiceConfigurationSnapshotTable({
			from: r.invoiceTable.id,
			to: r.invoiceConfigurationSnapshotTable.invoiceId,
			optional: false,
		}),
	},

	contractSnapshotTable: {
		client: r.one.contractClientSnapshotTable({
			from: r.contractSnapshotTable.id,
			to: r.contractClientSnapshotTable.contractSnapshotId,
			optional: false,
		}),

		original: r.one.contractTable({
			from: r.contractSnapshotTable.originalContractId,
			to: r.contractTable.id,
			optional: true,
		}),
	},

	contractClientSnapshotTable: {
		address: r.one.contractClientAddressSnapshotTable({
			from: r.contractClientSnapshotTable.id,
			to: r.contractClientAddressSnapshotTable.contractClientSnapshotId,
			optional: false,
		}),

		original: r.one.contractClientTable({
			from: r.contractClientSnapshotTable.originalContractClientId,
			to: r.contractClientTable.id,
			optional: true,
		}),
	},

	contractClientAddressSnapshotTable: {
		original: r.one.contractClientAddressTable({
			from: r.contractClientAddressSnapshotTable
				.originalContractClientAddressId,
			to: r.contractClientAddressTable.id,
			optional: true,
		}),
	},

	invoiceConfigurationSnapshotTable: {
		original: r.one.invoiceConfigurationTable({
			from: r.invoiceConfigurationSnapshotTable.originalInvoiceConfigurationId,
			to: r.invoiceConfigurationTable.id,
			optional: true,
		}),
	},
}));
