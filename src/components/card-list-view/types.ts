import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { cardListViewListItemVariants } from './consts';

export type CardListViewRootProps = ComponentProps<'section'>;

export type CardListViewListRootProps = ComponentProps<'section'>;

export type CardListViewListTitleProps = ComponentProps<'p'>;

export type CardListViewListContentProps = ComponentProps<'div'>;

export type CardListViewListItemVariantProps = VariantProps<
	typeof cardListViewListItemVariants
>;

export type CardListViewListItemProps = ComponentProps<'div'> &
	CardListViewListItemVariantProps & {
		asChild?: boolean;
	};

export type CardListViewListCreateItemProps = ComponentProps<'div'> & {
	asChild?: boolean;
};

export type CardListViewCardRootProps = ComponentProps<'div'>;
