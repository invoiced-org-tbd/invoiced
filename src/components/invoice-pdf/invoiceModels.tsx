import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { formatCurrency } from '@/utils/currencyUtils';
import { formatInvoiceTodayDate } from '@/utils/dateUtils';
import { appConfig } from '@/utils/appConfig';
import type { FC } from 'react';
import type { InvoicePDFModel, InvoicePDFModelProps } from './types';
import { useGetCountryName } from '@/lib/countries';

const styles = StyleSheet.create({
	page: {
		paddingHorizontal: 34,
		paddingVertical: 30,
		fontSize: 10,
		fontFamily: 'Helvetica',
		color: '#111111',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 18,
	},
	issuerName: {
		fontSize: 13,
		fontWeight: 700,
		textTransform: 'uppercase',
	},
	headerMeta: {
		alignItems: 'flex-end',
	},
	invoiceNumber: {
		fontSize: 16,
		fontWeight: 700,
		marginBottom: 2,
	},
	issuedDate: {
		fontSize: 10,
		color: '#444444',
	},
	separator: {
		borderBottomWidth: 1,
		borderBottomColor: '#B5B5B5',
		marginBottom: 24,
	},
	invoiceTitle: {
		fontSize: 34,
		fontWeight: 800,
		letterSpacing: 0.2,
		marginBottom: 22,
	},
	label: {
		fontSize: 9,
		fontWeight: 700,
		color: '#8F8F8F',
		textTransform: 'uppercase',
		marginBottom: 7,
	},
	addressSection: {
		flexDirection: 'row',
		marginBottom: 30,
	},
	addressColumn: {
		flex: 1,
		paddingRight: 14,
	},
	addressCompany: {
		fontSize: 11.5,
		fontWeight: 700,
		marginBottom: 4,
	},
	addressLine: {
		fontSize: 9.5,
		lineHeight: 1.35,
		marginBottom: 2,
	},
	tableHeader: {
		flexDirection: 'row',
		backgroundColor: '#F6F6F6',
		paddingVertical: 7,
		paddingHorizontal: 12,
		marginBottom: 0,
	},
	tableRow: {
		flexDirection: 'row',
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#ECECEC',
	},
	itemCol: {
		flex: 1,
	},
	rateCol: {
		width: 110,
		textAlign: 'right',
	},
	amountCol: {
		width: 110,
		textAlign: 'right',
	},
	tableHeaderText: {
		fontSize: 9.5,
		fontWeight: 700,
		letterSpacing: 0.5,
	},
	tableText: {
		fontSize: 10,
	},
	totalDivider: {
		borderBottomWidth: 1,
		borderBottomColor: '#C8C8C8',
		marginTop: 24,
		marginBottom: 12,
	},
	totalRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	totalLabel: {
		fontSize: 20,
		fontWeight: 700,
	},
	totalAmount: {
		fontSize: 20,
		fontWeight: 700,
	},
	generatedDivider: {
		borderBottomWidth: 1,
		borderBottomColor: '#E5E5E5',
		marginTop: 12,
		marginBottom: 8,
	},
	generatedWith: {
		fontSize: 8.5,
		color: '#777777',
		textAlign: 'center',
	},
	title: {
		fontSize: 22,
		fontWeight: 700,
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 11,
		color: '#4B5563',
	},
	section: {
		marginBottom: 14,
	},
});

const displayText = (value: string | number | null | undefined) => {
	if (value === null || value === undefined) {
		return 'Not provided';
	}

	if (typeof value === 'number') {
		return Number.isFinite(value) && value > 0 ? `${value}` : 'Not provided';
	}

	return value.trim() ? value : 'Not provided';
};

const formatAddressLine = (first?: string | null, second?: string | null) => {
	const value = [first, second].filter(Boolean).join(' ');
	return value || 'Not provided';
};

const InvoicePDFModelBaseV0 = ({
	contractData,
	company,
}: InvoicePDFModelProps) => {
	const { role, client } = contractData;

	const { getCountryName } = useGetCountryName();

	const hasRate = Number.isFinite(role.rate) && role.rate > 0;
	const rateValue = hasRate ? role.rate : 0;
	const amount = formatCurrency({ value: rateValue });
	const issueDate = formatInvoiceTodayDate();

	return (
		<Document>
			<Page
				size='A4'
				style={styles.page}
			>
				<View style={styles.header}>
					<Text style={styles.issuerName}>{displayText(company.name)}</Text>

					<View style={styles.headerMeta}>
						<Text style={styles.invoiceNumber}>#1</Text>
						<Text style={styles.issuedDate}>Issued on {issueDate}</Text>
					</View>
				</View>
				<View style={styles.separator} />

				<Text style={styles.invoiceTitle}>INVOICE</Text>

				<View style={styles.addressSection}>
					<View style={styles.addressColumn}>
						<Text style={styles.label}>From</Text>
						<Text style={styles.addressCompany}>
							{displayText(company.name)}
						</Text>
						<Text style={styles.addressLine}>
							{formatAddressLine(
								company.address.street1 ?? company.address.street2,
								company.address.number,
							)}
						</Text>
						<Text style={styles.addressLine}>
							{formatAddressLine(company.address.city, company.address.state)},{' '}
							{getCountryName(company.address.country)}
						</Text>
						<Text style={styles.addressLine}>
							{displayText(company.address.postalCode)}
						</Text>
						<Text style={styles.addressLine}>{displayText(company.email)}</Text>
					</View>

					<View style={styles.addressColumn}>
						<Text style={styles.label}>Billed to</Text>
						<Text style={styles.addressCompany}>
							{displayText(client.companyName)}
						</Text>
						<Text style={styles.addressLine}>
							{formatAddressLine(client.address.street1, client.address.number)}
						</Text>
						<Text style={styles.addressLine}>
							{formatAddressLine(client.address.city, client.address.state)},{' '}
							{getCountryName(client.address.country)}
						</Text>
						<Text style={styles.addressLine}>
							{displayText(client.address.postalCode)}
						</Text>
						<Text style={styles.addressLine}>
							{displayText(client.responsibleEmail)}
						</Text>
					</View>
				</View>

				<View style={styles.tableHeader}>
					<Text style={[styles.tableHeaderText, styles.itemCol]}>ITEM</Text>
					<Text style={[styles.tableHeaderText, styles.rateCol]}>RATE</Text>
					<Text style={[styles.tableHeaderText, styles.amountCol]}>AMOUNT</Text>
				</View>

				<View style={styles.tableRow}>
					<Text style={[styles.tableText, styles.itemCol]}>
						{displayText(role.description)}
					</Text>
					<Text style={[styles.tableText, styles.rateCol]}>
						{hasRate ? amount : 'Not provided'}
					</Text>
					<Text style={[styles.tableText, styles.amountCol]}>
						{hasRate ? amount : 'Not provided'}
					</Text>
				</View>

				<View style={styles.totalDivider} />

				<View style={styles.totalRow}>
					<Text style={styles.totalLabel}>Total</Text>
					<Text style={styles.totalAmount}>{hasRate ? amount : '$0.00'}</Text>
				</View>

				<View style={styles.generatedDivider} />
				<Text style={styles.generatedWith}>
					Generated with {appConfig.appName}
				</Text>
			</Page>
		</Document>
	);
};

export const invoicePDFModelMap = {
	'base-v0': InvoicePDFModelBaseV0,
} as const satisfies Record<InvoicePDFModel, FC<InvoicePDFModelProps>>;
