import type { LucideIcon } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { timelineIndicatorVariants } from './consts';

export type TimelineState = 'completed' | 'current' | 'upcoming' | 'error';

export type TimelineRootProps = ComponentProps<'ul'> & {
	dense?: boolean;
};

export type TimelineItemProps = ComponentProps<'li'> & {
	state?: TimelineState;
	isLast?: boolean;
};

export type TimelineIndicatorProps = ComponentProps<'div'> &
	Omit<VariantProps<typeof timelineIndicatorVariants>, 'state'> & {
		state?: TimelineState;
		icon?: LucideIcon;
		iconClassName?: string;
		children?: ReactNode;
	};

export type TimelineConnectorProps = ComponentProps<'hr'> & {
	state?: TimelineState;
	hideWhenLast?: boolean;
};

export type TimelineContentProps = ComponentProps<'div'>;

export type TimelineTitleProps = ComponentProps<'p'> & {
	state?: TimelineState;
};

export type TimelineMetaProps = ComponentProps<'span'>;

export type TimelineDescriptionProps = ComponentProps<'div'>;
