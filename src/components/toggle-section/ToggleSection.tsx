import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { createContext, useContext, useState } from 'react';
import { toggleSectionHeaderVariants, toggleSectionVariants } from './consts';
import type {
	ToggleSectionContentProps,
	ToggleSectionDescriptionProps,
	ToggleSectionFooterProps,
	ToggleSectionHeaderProps,
	ToggleSectionRootProps,
	ToggleSectionTitleProps,
	ToggleSectionVariantProps,
} from './types';

type ToggleSectionContextValue = {
	open: boolean;
	toggleOpen: () => void;
	variant: ToggleSectionVariantProps['variant'];
};

const ToggleSectionContext = createContext<ToggleSectionContextValue | null>(
	null,
);

const useToggleSectionContext = () => {
	const context = useContext(ToggleSectionContext);

	if (!context) {
		throw new Error(
			'ToggleSection components must be used within ToggleSection.Root',
		);
	}

	return context;
};

const Root = ({
	className,
	variant,
	open,
	defaultOpen = false,
	onOpenChange,
	...props
}: ToggleSectionRootProps) => {
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isControlled = open !== undefined;
	const isOpen = isControlled ? open : internalOpen;

	const setOpen = (nextOpen: boolean) => {
		if (!isControlled) {
			setInternalOpen(nextOpen);
		}

		onOpenChange?.(nextOpen);
	};

	const contextValue = {
		open: isOpen,
		toggleOpen: () => setOpen(!isOpen),
		variant,
	};

	return (
		<ToggleSectionContext.Provider value={contextValue}>
			<section
				data-slot='toggle-section'
				data-state={isOpen ? 'open' : 'closed'}
				className={cn(
					'flex flex-col',
					toggleSectionVariants({ variant }),
					className,
				)}
				{...props}
			/>
		</ToggleSectionContext.Provider>
	);
};

const Header = ({ className, onClick, ...props }: ToggleSectionHeaderProps) => {
	const { open, toggleOpen, variant } = useToggleSectionContext();

	return (
		<button
			type='button'
			aria-expanded={open}
			className={cn(toggleSectionHeaderVariants({ variant }), className)}
			data-slot='toggle-section-header'
			onClick={(event) => {
				onClick?.(event);

				if (event.defaultPrevented) {
					return;
				}
				toggleOpen();
			}}
			{...props}
		/>
	);
};

const Title = ({ className, ...props }: ToggleSectionTitleProps) => {
	return (
		<h3
			data-slot='toggle-section-title'
			className={cn('text-sm font-semibold leading-none', className)}
			{...props}
		/>
	);
};

const Description = ({
	className,
	...props
}: ToggleSectionDescriptionProps) => {
	return (
		<p
			data-slot='toggle-section-description'
			className={cn(
				'text-sm font-medium text-secondary-foreground/80',
				className,
			)}
			{...props}
		/>
	);
};

const Content = ({ className, ...props }: ToggleSectionContentProps) => {
	const { open } = useToggleSectionContext();

	return (
		<motion.div
			data-state={open ? 'open' : 'closed'}
			aria-hidden={!open}
			initial={false}
			animate={{
				height: open ? 'auto' : 0,
				opacity: open ? 1 : 0,
			}}
			transition={{
				height: { duration: 0.24, ease: 'easeInOut' },
				opacity: { duration: 0.2, ease: 'easeInOut' },
			}}
			className='overflow-hidden'
		>
			<div
				data-slot='toggle-section-content'
				className={cn('text-sm', className)}
				{...props}
			/>
		</motion.div>
	);
};

const Footer = ({ className, ...props }: ToggleSectionFooterProps) => {
	return (
		<div
			data-slot='toggle-section-footer'
			className={cn('mt-3 border-t border-current/10 pt-3 text-sm', className)}
			{...props}
		/>
	);
};

export const ToggleSection = {
	Root,
	Header,
	Title,
	Description,
	Content,
	Footer,
};
