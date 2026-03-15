import { ChevronDownIcon, XIcon } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { useId, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Badge } from '../badge';
import { BaseField } from '../base-field';
import { fieldInputVariants } from '../base-field/consts';
import type { InputButton } from '../base-field/types';
import { useBaseField } from '../base-field/useBaseField';
import { Checkbox } from '../checkbox';
import { Popover } from '../popover';
import { cn } from '@/lib/utils';
import type {
	MultiSelectInputGroup,
	MultiSelectInputItem,
	MultiSelectInputProps,
} from './types';

const isGroupedOptions = (
	options: MultiSelectInputItem[] | MultiSelectInputGroup[],
): options is MultiSelectInputGroup[] => {
	return options.length > 0 && 'heading' in options[0];
};

const MultiSelectChevronIcon = ({ className, ...props }: LucideProps) => {
	return (
		<ChevronDownIcon
			strokeWidth={1.6}
			className={cn('text-foreground/50', className)}
			{...props}
		/>
	);
};

const handleInteractiveKeyDown = (
	event: KeyboardEvent<HTMLElement>,
	callback: () => void,
) => {
	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		callback();
	}
};

export const MultiSelectInput = ({
	onChange,
	value,
	label,
	description,
	errors,
	showErrors,
	disabled,
	required,
	readOnly,
	options,
	placeholder = 'Select options...',
	searchable = true,
	hideSelectAll = false,
	maxCount = 3,
	closeOnSelect = false,
	buttons = [],
	className,
	...props
}: MultiSelectInputProps) => {
	const baseId = useId();
	const id = props.id ?? baseId;
	const listboxId = `${id}-listbox`;

	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const selectedValues = value ?? [];

	const { inputProps } = useBaseField({
		errors,
		showErrors,
		disabled,
		required,
		readOnly,
	});

	const allOptions = useMemo(() => {
		if (isGroupedOptions(options)) {
			return options.flatMap((group) => group.options);
		}

		return options;
	}, [options]);

	const filteredOptions = useMemo(() => {
		if (!searchable || !searchValue) {
			return options;
		}

		const normalizedSearchValue = searchValue.toLowerCase();
		if (isGroupedOptions(options)) {
			return options
				.map((group) => ({
					...group,
					options: group.options.filter((option) =>
						option.label.toLowerCase().includes(normalizedSearchValue),
					),
				}))
				.filter((group) => group.options.length > 0);
		}

		return options.filter((option) =>
			option.label.toLowerCase().includes(normalizedSearchValue),
		);
	}, [options, searchValue, searchable]);

	const selectedOptions = useMemo(() => {
		const selectedValuesSet = new Set(selectedValues);
		return allOptions.filter((option) => selectedValuesSet.has(option.value));
	}, [allOptions, selectedValues]);

	const selectableValues = useMemo(() => {
		return allOptions
			.filter((option) => !option.disabled)
			.map((option) => option.value);
	}, [allOptions]);

	const hasSelectedAll = selectableValues.every((optionValue) =>
		selectedValues.includes(optionValue),
	);

	const updateSelectedValues = (nextValues: string[]) => {
		if (disabled || readOnly) {
			return;
		}

		if (required && nextValues.length === 0) {
			return;
		}

		onChange?.(nextValues);
	};

	const toggleOption = (option: MultiSelectInputItem) => {
		if (option.disabled) {
			return;
		}

		const nextValues = selectedValues.includes(option.value)
			? selectedValues.filter((value) => value !== option.value)
			: [...selectedValues, option.value];

		updateSelectedValues(nextValues);

		if (closeOnSelect) {
			setIsPopoverOpen(false);
		}
	};

	const handleToggleAll = () => {
		const nextValues = hasSelectedAll ? [] : selectableValues;
		updateSelectedValues(nextValues);

		if (closeOnSelect) {
			setIsPopoverOpen(false);
		}
	};

	const handleClear = () => {
		updateSelectedValues([]);
	};

	const hiddenSelectedCount = Math.max(selectedValues.length - maxCount, 0);
	const defaultTriggerButton: InputButton = {
		side: 'right',
		icon: MultiSelectChevronIcon,
		label: 'Toggle options',
		onClick: () => {
			setIsPopoverOpen((previousState) => !previousState);
		},
	};
	const inputButtons = [...buttons, defaultTriggerButton];

	return (
		<BaseField.Root>
			<BaseField.Label htmlFor={id}>{label}</BaseField.Label>

			<BaseField.Control>
				<Popover.Root
					open={isPopoverOpen}
					onOpenChange={setIsPopoverOpen}
				>
					<Popover.Trigger asChild>
						<button
							{...props}
							{...inputProps}
							id={id}
							type='button'
							data-slot='input'
							role='combobox'
							aria-expanded={isPopoverOpen}
							aria-controls={listboxId}
							className={cn(
								fieldInputVariants({
									height: 'min',
									focusMode: 'focusVisible',
								}),
								'flex items-center justify-between gap-2',
								className,
							)}
						>
							<BaseField.InputButtons
								buttons={inputButtons}
								side='left'
								layout='inline'
								disabled={disabled}
								readOnly={readOnly}
								onButtonClick={(event, button) => {
									event.preventDefault();
									event.stopPropagation();
									button.onClick();
								}}
							/>

							{selectedOptions.length > 0 ? (
								<div
									data-slot='multi-select-input-values'
									className='flex min-w-0 flex-1 flex-wrap items-center gap-1'
								>
									{selectedOptions.slice(0, maxCount).map((option) => (
										<Badge
											key={option.value}
											variant='secondary'
										>
											<span className='truncate max-w-44'>{option.label}</span>
											<button
												type='button'
												data-slot='multi-select-input-remove-option'
												className='rounded-sm hover:bg-black/10'
												onClick={(event) => {
													event.preventDefault();
													event.stopPropagation();
													toggleOption(option);
												}}
												aria-label={`Remove ${option.label}`}
											>
												<XIcon className='size-3' />
											</button>
										</Badge>
									))}

									{hiddenSelectedCount > 0 && (
										<Badge variant='outline'>+{hiddenSelectedCount} more</Badge>
									)}
								</div>
							) : (
								<span className='text-muted-foreground text-left flex-1'>
									{placeholder}
								</span>
							)}

							<div className='flex items-center gap-1'>
								<BaseField.InputButtons
									buttons={inputButtons}
									side='right'
									layout='inline'
									disabled={disabled}
									readOnly={readOnly}
									onButtonClick={(event, button) => {
										event.preventDefault();
										event.stopPropagation();
										button.onClick();
									}}
								/>
							</div>
						</button>
					</Popover.Trigger>

					<Popover.Content
						align='start'
						className='w-(--radix-popover-trigger-width) p-0'
					>
						<div
							data-slot='multi-select-input-content'
							className='flex flex-col gap-2 p-2'
						>
							{searchable && (
								<input
									type='text'
									value={searchValue}
									onChange={(event) => setSearchValue(event.target.value)}
									placeholder='Search options...'
									className={cn(
										fieldInputVariants({
											height: 'fixed',
											focusMode: 'focusVisible',
										}),
										'rounded-md text-sm px-2',
									)}
								/>
							)}

							<div
								id={listboxId}
								role='listbox'
								aria-multiselectable='true'
								className='max-h-72 overflow-y-auto space-y-1'
							>
								{!hideSelectAll && allOptions.length > 0 && (
									<div
										data-slot='multi-select-input-select-all'
										onClick={handleToggleAll}
										onKeyDown={(event) =>
											handleInteractiveKeyDown(event, handleToggleAll)
										}
										role='button'
										tabIndex={0}
										className='hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1.5 text-sm flex w-full items-center gap-2'
									>
										<Checkbox
											aria-hidden='true'
											tabIndex={-1}
											value={hasSelectedAll}
											className='pointer-events-none'
										/>
										<span>Select all</span>
									</div>
								)}

								{isGroupedOptions(filteredOptions)
									? filteredOptions.map((group) => (
											<div
												key={group.heading}
												data-slot='multi-select-input-group'
												className='space-y-1'
											>
												<p className='text-muted-foreground px-2 py-1 text-xs'>
													{group.heading}
												</p>

												{group.options.map((option) => {
													const isSelected = selectedValues.includes(
														option.value,
													);
													return (
														<div
															key={option.value}
															role='option'
															aria-selected={isSelected}
															aria-disabled={option.disabled}
															tabIndex={option.disabled ? -1 : 0}
															onClick={() => {
																if (!option.disabled) {
																	toggleOption(option);
																}
															}}
															onKeyDown={(event) =>
																handleInteractiveKeyDown(event, () =>
																	toggleOption(option),
																)
															}
															className='hover:bg-accent hover:text-accent-foreground aria-disabled:opacity-50 aria-disabled:pointer-events-none rounded-md px-2 py-1.5 text-sm flex w-full items-center gap-2'
														>
															<Checkbox
																aria-hidden='true'
																tabIndex={-1}
																value={isSelected}
																className='pointer-events-none'
															/>
															<span className='truncate'>{option.label}</span>
														</div>
													);
												})}
											</div>
										))
									: filteredOptions.map((option) => {
											const isSelected = selectedValues.includes(option.value);
											return (
												<div
													key={option.value}
													role='option'
													aria-selected={isSelected}
													aria-disabled={option.disabled}
													tabIndex={option.disabled ? -1 : 0}
													onClick={() => {
														if (!option.disabled) {
															toggleOption(option);
														}
													}}
													onKeyDown={(event) =>
														handleInteractiveKeyDown(event, () =>
															toggleOption(option),
														)
													}
													className='hover:bg-accent hover:text-accent-foreground aria-disabled:opacity-50 aria-disabled:pointer-events-none rounded-md px-2 py-1.5 text-sm flex w-full items-center gap-2'
												>
													<Checkbox
														aria-hidden='true'
														tabIndex={-1}
														value={isSelected}
														className='pointer-events-none'
													/>
													<span className='truncate'>{option.label}</span>
												</div>
											);
										})}

								{(isGroupedOptions(filteredOptions)
									? filteredOptions.every((group) => group.options.length === 0)
									: filteredOptions.length === 0) && (
									<p className='text-muted-foreground p-2 text-sm'>
										{placeholder}
									</p>
								)}
							</div>

							<div className='border-border border-t pt-2 flex items-center justify-end gap-2'>
								{!!selectedValues.length && (
									<button
										type='button'
										data-slot='multi-select-input-clear'
										onClick={handleClear}
										className='hover:bg-accent rounded-md px-2 py-1 text-sm'
									>
										Clear
									</button>
								)}
								<button
									type='button'
									data-slot='multi-select-input-close'
									onClick={() => setIsPopoverOpen(false)}
									className='hover:bg-accent rounded-md px-2 py-1 text-sm'
								>
									Close
								</button>
							</div>
						</div>
					</Popover.Content>
				</Popover.Root>
			</BaseField.Control>

			<BaseField.Description>{description}</BaseField.Description>
			<BaseField.Error
				errors={errors}
				showErrors={showErrors}
			/>
		</BaseField.Root>
	);
};
