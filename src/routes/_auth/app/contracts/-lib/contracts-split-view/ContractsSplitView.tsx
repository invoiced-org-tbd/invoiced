import { getContractsQueryOptions } from '@/api/contract/getContracts';
import type { GetContractsResponse } from '@/api/contract/getContracts';
import { Badge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { Separator } from '@/components/separator/Separator';
import { useTranslate } from '@/hooks/use-translate/useTranslate';
import { cn } from '@/utils/classNamesUtils';
import { formatCurrency } from '@/utils/currencyUtils';
import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import {
	BriefcaseBusinessIcon,
	Building2Icon,
	MailIcon,
	PencilIcon,
	PlusIcon,
	TrashIcon,
	UserRoundIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type Contract = GetContractsResponse[number];

const contractsRouteApi = getRouteApi('/_auth/app/contracts/');

const ContractEmptyState = ({ onAdd }: { onAdd: () => void }) => {
	const { t } = useTranslate();

	return (
		<Card.Root className='border-dashed'>
			<Card.Header className='space-y-2'>
				<Badge
					variant='secondary'
					className='w-fit'
				>
					{t('contracts.list.emptyBadge')}
				</Badge>
				<Card.Title className='text-xl'>
					{t('contracts.list.emptyTitle')}
				</Card.Title>
				<Card.Description>
					{t('contracts.list.emptyDescription')}
				</Card.Description>
			</Card.Header>

			<Card.Content>
				<Button onClick={onAdd}>
					<PlusIcon />
					{t('contracts.list.emptyCta')}
				</Button>
			</Card.Content>
		</Card.Root>
	);
};

const ContractListPane = ({
	contracts,
	selectedContractId,
	onSelectContract,
	onAddContract,
}: {
	contracts: Contract[];
	selectedContractId: string | null;
	onSelectContract: (contractId: string) => void;
	onAddContract: () => void;
}) => {
	const { t } = useTranslate();
	const isSingleContract = contracts.length === 1;

	if (isSingleContract) {
		const singleContract = contracts[0];

		return (
			<div className='flex items-center justify-between gap-3 rounded-xl border bg-card/85 px-4 py-3 shadow-sm'>
				<div className='min-w-0'>
					<p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
						{t('contracts.list.singleLabel')}
					</p>
					<p className='truncate text-sm font-semibold text-card-foreground'>
						{singleContract.client.companyName}
					</p>
				</div>

				<div className='flex items-center gap-2'>
					<Badge variant='secondary'>{t('contracts.list.singleBadge')}</Badge>
					<Button
						onClick={onAddContract}
						size='xs'
						isOutlined
					>
						<PlusIcon />
						{t('entity.addTitle', { entity: t('contracts.name') })}
					</Button>
				</div>
			</div>
		);
	}

	return (
		<Card.Root className='h-fit relative'>
			<div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/55 to-transparent' />
			<Card.Header className='space-y-1.5'>
				<div className='flex items-center justify-between gap-2'>
					<Card.Title>{t('contracts.title')}</Card.Title>
					<Badge variant='secondary'>
						{t('contracts.list.count', { count: contracts.length })}
					</Badge>
				</div>
				<Card.Description>
					{t('contracts.list.listDescription')}
				</Card.Description>
			</Card.Header>

			<Card.Content className='space-y-1.5'>
				{contracts.map((contract) => {
					const isSelected = selectedContractId === contract.id;

					return (
						<button
							type='button'
							key={contract.id}
							onClick={() => onSelectContract(contract.id)}
							className={cn(
								'group w-full rounded-lg border px-3 py-2.5 text-left transition-colors',
								'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25',
								isSelected
									? 'border-primary/30 bg-primary/5'
									: 'border-border bg-background hover:bg-muted/50',
							)}
						>
							<p className='truncate text-sm font-medium text-card-foreground'>
								{contract.client.companyName}
							</p>
							<p className='truncate text-xs text-muted-foreground'>
								{contract.role.description}
							</p>
						</button>
					);
				})}
			</Card.Content>
		</Card.Root>
	);
};

const ContractDetailCard = ({
	contract,
	onEdit,
	onDelete,
}: {
	contract: Contract;
	onEdit: () => void;
	onDelete: () => void;
}) => {
	const { t } = useTranslate();
	const recurrenceItemsCount = contract.invoiceRecurrence.items.length;
	const updatedAt = useMemo(
		() =>
			new Intl.DateTimeFormat(undefined, {
				month: 'short',
				day: '2-digit',
				year: 'numeric',
			}).format(new Date(contract.updatedAt)),
		[contract.updatedAt],
	);

	return (
		<Card.Root className='relative overflow-hidden'>
			<div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/55 to-transparent' />

			<Card.Header className='space-y-3'>
				<div className='flex flex-wrap items-start justify-between gap-3'>
					<div className='space-y-1 min-w-0'>
						<Card.Title className='truncate text-2xl'>
							{contract.client.companyName}
						</Card.Title>
						<Card.Description className='text-sm'>
							{contract.role.description}
						</Card.Description>
					</div>

					<div className='flex items-center gap-2'>
						<Button
							isIcon
							variant='secondary'
							tooltip={t('common.edit')}
							onClick={onEdit}
						>
							<PencilIcon />
						</Button>
						<Button
							isIcon
							variant='destructive'
							tooltip={t('common.delete')}
							onClick={onDelete}
						>
							<TrashIcon />
						</Button>
					</div>
				</div>

				<div className='flex flex-wrap gap-2'>
					<Badge variant='secondary'>
						{t('contracts.list.recurrenceValue', {
							count: recurrenceItemsCount,
						})}
					</Badge>
					<Badge variant='secondary'>
						{contract.autoSend
							? t('contracts.list.autoSendOn')
							: t('contracts.list.autoSendOff')}
					</Badge>
				</div>
			</Card.Header>

			<Card.Content className='space-y-5'>
				<div className='grid gap-4 md:grid-cols-2'>
					<div className='rounded-lg border bg-muted/30 p-3.5 space-y-1.5'>
						<p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
							{t('contracts.list.roleLabel')}
						</p>
						<div className='flex items-center gap-2 text-sm font-medium'>
							<BriefcaseBusinessIcon className='size-4 text-muted-foreground' />
							<span>{contract.role.description}</span>
						</div>
					</div>

					<div className='rounded-lg border bg-muted/30 p-3.5 space-y-1.5'>
						<p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
							{t('contracts.summary.salaryLabel')}
						</p>
						<p className='text-sm font-medium'>
							{formatCurrency({ value: contract.role.rate })}
						</p>
					</div>
				</div>

				<Separator />

				<div className='space-y-3'>
					<p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
						{t('contracts.summary.billingLabel')}
					</p>

					<div className='grid gap-3 md:grid-cols-2'>
						<div className='flex items-center gap-2 text-sm'>
							<UserRoundIcon className='size-4 text-muted-foreground' />
							<span className='truncate'>
								{contract.client.responsibleName}
							</span>
						</div>
						<div className='flex items-center gap-2 text-sm'>
							<MailIcon className='size-4 text-muted-foreground' />
							<span className='truncate'>
								{contract.client.responsibleEmail}
							</span>
						</div>
						<div className='flex items-center gap-2 text-sm md:col-span-2'>
							<Building2Icon className='size-4 text-muted-foreground' />
							<span className='truncate'>{contract.client.companyName}</span>
						</div>
					</div>
				</div>

				<Separator />

				<div className='flex flex-wrap items-center justify-between gap-2 text-sm'>
					<span className='text-muted-foreground'>
						{t('contracts.list.updatedAtLabel')}
					</span>
					<span className='font-medium'>{updatedAt}</span>
				</div>
			</Card.Content>
		</Card.Root>
	);
};

export const ContractsSplitView = () => {
	const { t } = useTranslate();
	const navigate = contractsRouteApi.useNavigate();
	const { data = [], isFetching } = useQuery(getContractsQueryOptions());
	const [selectedContractId, setSelectedContractId] = useState<string | null>(
		null,
	);

	useEffect(() => {
		if (!data.length) {
			setSelectedContractId(null);
			return;
		}

		const hasCurrentSelectedContract = data.some(
			(contract) => contract.id === selectedContractId,
		);

		if (!hasCurrentSelectedContract) {
			setSelectedContractId(data[0].id);
		}
	}, [data, selectedContractId]);

	const selectedContract =
		data.find((contract) => contract.id === selectedContractId) ?? data[0];

	const onAddContract = () => {
		navigate({
			search: (prev) => ({
				...prev,
				isCreating: true,
			}),
		});
	};

	const onEditContract = (contractId: string) => {
		navigate({
			search: (prev) => ({
				...prev,
				editId: contractId,
			}),
		});
	};

	const onDeleteContract = (contractId: string) => {
		navigate({
			search: (prev) => ({
				...prev,
				deleteId: contractId,
			}),
		});
	};

	if (!isFetching && !data.length) {
		return <ContractEmptyState onAdd={onAddContract} />;
	}

	const isSingleContract = data.length <= 1;

	return (
		<section className='space-y-4'>
			<header className='flex flex-wrap items-end justify-between gap-3'>
				<div>
					<p className='text-sm text-muted-foreground'>
						{t('contracts.list.pageDescription')}
					</p>
				</div>

				{!isSingleContract && (
					<Button onClick={onAddContract}>
						<PlusIcon />
						{t('entity.addTitle', { entity: t('contracts.name') })}
					</Button>
				)}
			</header>

			<div
				className={cn(
					'grid gap-4',
					isSingleContract
						? 'grid-cols-1'
						: 'grid-cols-1 xl:grid-cols-[400px_1fr]',
				)}
			>
				<ContractListPane
					contracts={data}
					selectedContractId={selectedContract?.id ?? null}
					onSelectContract={setSelectedContractId}
					onAddContract={onAddContract}
				/>

				{selectedContract ? (
					<ContractDetailCard
						contract={selectedContract}
						onEdit={() => onEditContract(selectedContract.id)}
						onDelete={() => onDeleteContract(selectedContract.id)}
					/>
				) : (
					<div className='rounded-xl border border-dashed p-8 text-sm text-muted-foreground'>
						{t('common.unknownError')}
					</div>
				)}
			</div>
		</section>
	);
};
