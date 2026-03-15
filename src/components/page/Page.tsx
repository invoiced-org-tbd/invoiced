import { cn } from '@/lib/utils';
import type {
	PageContentProps,
	PageDescriptionProps,
	PageHeaderProps,
	PageRootProps,
	PageTitleProps,
} from './types';

const Root = ({
	children,
	className,
	...props
}: PageRootProps) => {
	return (
		<main
			className={cn('min-h-0 flex-1 p-8', className)}
			{...props}
		>
			{children}
		</main>
	);
};

const Header = ({ children, className, ...props }: PageHeaderProps) => {
	return (
		<section
			className={cn('flex flex-col gap-1', className)}
			{...props}
		>
			{children}
		</section>
	);
};

const Title = ({ children, className, ...props }: PageTitleProps) => {
	return (
		<h1
			className={cn('text-2xl font-semibold leading-none', className)}
			{...props}
		>
			{children}
		</h1>
	);
};

const Description = ({
	children,
	className,
	...props
}: PageDescriptionProps) => {
	return (
		<p
			className={cn('text-sm text-muted-foreground leading-none', className)}
			{...props}
		>
			{children}
		</p>
	);
};

const Content = ({ children, ...props }: PageContentProps) => {
	return <section {...props}>{children}</section>;
};

export const Page = {
	Root,
	Header,
	Title,
	Description,
	Content,
};
