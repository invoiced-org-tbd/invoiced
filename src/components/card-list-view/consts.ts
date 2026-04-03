import { cva } from 'class-variance-authority';

export const cardListViewListItemVariants = cva(
	'block text-sm text-muted-foreground space-y-0.5 w-full text-left rounded-lg p-2 cursor-pointer transition-colors',
	{
		variants: {
			isSelected: {
				true: 'bg-primary/10',
				false: 'hover:bg-primary/5',
			}
		},
		defaultVariants: {
			isSelected: false,
		},
	},
);
