import { cn } from '@/utils/classNamesUtils';
import { CheckIcon, CircleIcon, XIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { createContext, useContext } from 'react';
import {
	timelineConnectorVariants,
	timelineContentVariants,
	timelineDescriptionVariants,
	timelineIndicatorVariants,
	timelineItemVariants,
	timelineMetaVariants,
	timelineRootVariants,
	timelineTitleVariants,
} from './consts';
import type {
	TimelineConnectorProps,
	TimelineContentProps,
	TimelineDescriptionProps,
	TimelineIndicatorProps,
	TimelineItemProps,
	TimelineMetaProps,
	TimelineRootProps,
	TimelineState,
	TimelineTitleProps,
} from './types';

type TimelineItemContextValue = {
	state: TimelineState;
	isLast: boolean;
};

const TimelineItemContext = createContext<TimelineItemContextValue | null>(
	null,
);

const useTimelineItemContext = () => {
	const context = useContext(TimelineItemContext);

	if (!context) {
		throw new Error('Timeline components must be used within Timeline.Item');
	}

	return context;
};

const timelineStateDefaultIconMap: Record<TimelineState, LucideIcon> = {
	completed: CheckIcon,
	current: CircleIcon,
	upcoming: CircleIcon,
	error: XIcon,
};

const Root = ({ className, dense, ...props }: TimelineRootProps) => {
	return (
		<ul
			data-slot='timeline'
			className={cn(timelineRootVariants({ dense }), className)}
			{...props}
		/>
	);
};

const Item = ({
	className,
	state = 'upcoming',
	isLast = false,
	...props
}: TimelineItemProps) => {
	return (
		<TimelineItemContext.Provider value={{ state, isLast }}>
			<li
				data-slot='timeline-item'
				data-state={state}
				data-last={isLast}
				className={cn(timelineItemVariants({ state }), className)}
				{...props}
			/>
		</TimelineItemContext.Provider>
	);
};

const Indicator = ({
	className,
	state,
	icon: Icon,
	iconClassName,
	children,
	...props
}: TimelineIndicatorProps) => {
	const itemContext = useTimelineItemContext();
	const resolvedState = state ?? itemContext.state;
	const ResolvedIcon = Icon ?? timelineStateDefaultIconMap[resolvedState];

	return (
		<div
			data-slot='timeline-indicator'
			role='status'
			aria-live='polite'
			className={cn(
				timelineIndicatorVariants({ state: resolvedState }),
				className,
			)}
			{...props}
		>
			{children ?? (
				<ResolvedIcon
					className={cn(
						resolvedState === 'completed' ? 'size-3.5' : 'size-2.5',
						iconClassName,
					)}
				/>
			)}
		</div>
	);
};

const Connector = ({
	className,
	state,
	hideWhenLast = true,
	...props
}: TimelineConnectorProps) => {
	const itemContext = useTimelineItemContext();
	const resolvedState = state ?? itemContext.state;
	const shouldHide = hideWhenLast && itemContext.isLast;

	if (shouldHide) {
		return null;
	}

	return (
		<hr
			data-slot='timeline-connector'
			aria-orientation='vertical'
			className={cn(
				timelineConnectorVariants({ state: resolvedState }),
				className,
			)}
			{...props}
		/>
	);
};

const Content = ({ className, ...props }: TimelineContentProps) => {
	return (
		<div
			data-slot='timeline-content'
			className={cn(timelineContentVariants(), className)}
			{...props}
		/>
	);
};

const Title = ({ className, state, ...props }: TimelineTitleProps) => {
	const itemContext = useTimelineItemContext();
	const resolvedState = state ?? itemContext.state;

	return (
		<p
			data-slot='timeline-title'
			className={cn(timelineTitleVariants({ state: resolvedState }), className)}
			{...props}
		/>
	);
};

const Meta = ({ className, ...props }: TimelineMetaProps) => {
	return (
		<span
			data-slot='timeline-meta'
			className={cn(timelineMetaVariants(), className)}
			{...props}
		/>
	);
};

const Description = ({ className, ...props }: TimelineDescriptionProps) => {
	return (
		<div
			data-slot='timeline-description'
			className={cn(timelineDescriptionVariants(), className)}
			{...props}
		/>
	);
};

export const Timeline = {
	Root,
	Item,
	Indicator,
	Connector,
	Content,
	Title,
	Meta,
	Description,
};
