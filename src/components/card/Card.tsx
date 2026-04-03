import { cn } from '@/utils/classNamesUtils';
import type {
	CardContentProps,
	CardDescriptionProps,
	CardFooterProps,
	CardHeaderProps,
	CardRootProps,
	CardTitleProps,
} from './types';

const Root = ({ className, ...props }: CardRootProps) => {
	return (
		<div
			data-slot='card'
			className={cn(
				'bg-card text-card-foreground rounded-xl border shadow-xs',
				className,
			)}
			{...props}
		/>
	);
};

const Header = ({ className, ...props }: CardHeaderProps) => {
	return (
		<div
			data-slot='card-header'
			className={cn('flex flex-col gap-1.5 p-6', className)}
			{...props}
		/>
	);
};

const Title = ({ className, ...props }: CardTitleProps) => {
	return (
		<h4
			data-slot='card-title'
			className={cn('font-semibold leading-none tracking-tight', className)}
			{...props}
		/>
	);
};

const Description = ({ className, ...props }: CardDescriptionProps) => {
	return (
		<p
			data-slot='card-description'
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
};

const Content = ({ className, ...props }: CardContentProps) => {
	return (
		<div
			data-slot='card-content'
			className={cn('p-6 pt-0', className)}
			{...props}
		/>
	);
};

const Footer = ({ className, ...props }: CardFooterProps) => {
	return (
		<div
			data-slot='card-footer'
			className={cn('flex items-center p-6 pt-0', className)}
			{...props}
		/>
	);
};

export const Card = {
	Root,
	Header,
	Title,
	Description,
	Content,
	Footer,
};
