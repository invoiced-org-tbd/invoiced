import { Card } from '@/components/card/Card';
import { cn } from '@/utils/classNamesUtils';
import { Slot } from '@radix-ui/react-slot';
import { cardListViewListItemVariants } from './consts';
import type {
	CardListViewCardRootProps,
	CardListViewListContentProps,
	CardListViewListCreateItemProps,
	CardListViewListItemProps,
	CardListViewListRootProps,
	CardListViewListTitleProps,
	CardListViewRootProps,
} from './types';

const Root = ({ className, ...props }: CardListViewRootProps) => {
	return (
		<section
			data-slot='card-list-view'
			className={cn('flex gap-8', className)}
			{...props}
		/>
	);
};

const ListRoot = ({ className, children, ...props }: CardListViewListRootProps) => {
	return (
		<section
			data-slot='card-list-view-list'
			className={cn(
				'min-w-3xs shrink-0 h-full border border-border/60 border-t-0 shadow-xs rounded-lg relative',
				className,
			)}
			{...props}
		>
			<div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/55 to-transparent' />
			{children}
		</section>
	);
};

const ListTitle = ({ className, ...props }: CardListViewListTitleProps) => {
	return (
		<p
			data-slot='card-list-view-list-title'
			className={cn('text-sm font-medium border-b border-border/60 p-3', className)}
			{...props}
		/>
	);
};

const ListContent = ({ className, ...props }: CardListViewListContentProps) => {
	return (
		<div
			data-slot='card-list-view-list-content'
			className={cn('p-2 space-y-1 w-full', className)}
			{...props}
		/>
	);
};

const ListItem = ({
	className,
	asChild = false,
	isSelected,
	...props
}: CardListViewListItemProps) => {
	const Comp = asChild ? Slot : 'div';

	return (
		<Comp
			data-slot='card-list-view-list-item'
			className={cn(cardListViewListItemVariants({ isSelected }), className)}
			{...props}
		/>
	);
};

const ListCreateItem = ({
	className,
	asChild = false,
	...props
}: CardListViewListCreateItemProps) => {
	const Comp = asChild ? Slot : 'div';

	return (
		<Comp
			data-slot='card-list-view-list-create-item'
			className={cn(
				'w-full rounded-lg py-7 border-2 border-dotted cursor-pointer transition-colors hover:bg-foreground/2',
				'text-sm text-muted-foreground font-medium flex items-center justify-center gap-1',
				className,
			)}
			{...props}
		/>
	);
};

const CardRoot = ({ className, children, ...props }: CardListViewCardRootProps) => {
	return (
		<Card.Root
			className={cn('w-full flex flex-col justify-between relative border-t-0', className)}
			{...props}
		>
			<div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/55 to-transparent' />
			{children}
		</Card.Root>
	);
};

export const CardListView = {
	Root,
	List: {
		Root: ListRoot,
		Title: ListTitle,
		Content: ListContent,
		Item: ListItem,
		CreateItem: ListCreateItem,
	},
	Card: {
		Root: CardRoot,
	},
};
