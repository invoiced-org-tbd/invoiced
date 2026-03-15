import type { CSSProperties } from 'react';
import { inputItemSchema } from './schemas';
import type { InputButton, InputItem } from './types';

const INPUT_DEFAULT_HORIZONTAL_PADDING_PX = 10;
const INPUT_BUTTON_SIDE_PADDING_PX = 4;
const INPUT_BUTTON_SIZE_PX = 20;
const INPUT_BUTTON_GAP_PX = 4;

export const isInputItem = (value: unknown): value is InputItem => {
	if (!value) {
		return false;
	}

	const parsed = inputItemSchema.safeParse(value);
	return parsed.success;
};

export const getInputButtonsBySide = (
	buttons: InputButton[] = [],
): Record<'left' | 'right', InputButton[]> => {
	return {
		left: buttons.filter((button) => button.side === 'left'),
		right: buttons.filter((button) => button.side === 'right'),
	};
};

const getSidePaddingByButtonsCount = (buttonsCount: number) => {
	if (buttonsCount <= 0) {
		return INPUT_DEFAULT_HORIZONTAL_PADDING_PX;
	}

	return (
		INPUT_BUTTON_SIDE_PADDING_PX +
		buttonsCount * INPUT_BUTTON_SIZE_PX +
		(buttonsCount - 1) * INPUT_BUTTON_GAP_PX +
		INPUT_BUTTON_SIDE_PADDING_PX
	);
};

export const getInputButtonsPaddingStyle = ({
	leftButtonsCount,
	rightButtonsCount,
}: {
	leftButtonsCount: number;
	rightButtonsCount: number;
}): CSSProperties => {
	return {
		paddingLeft: getSidePaddingByButtonsCount(leftButtonsCount),
		paddingRight: getSidePaddingByButtonsCount(rightButtonsCount),
	};
};

export const getInputButtonsLayout = ({
	buttons = [],
	extraRightButtonsCount = 0,
}: {
	buttons?: InputButton[];
	extraRightButtonsCount?: number;
}) => {
	const inputButtons = getInputButtonsBySide(buttons);
	const paddingStyle = getInputButtonsPaddingStyle({
		leftButtonsCount: inputButtons.left.length,
		rightButtonsCount: inputButtons.right.length + extraRightButtonsCount,
	});

	return {
		inputButtons,
		paddingStyle,
	};
};
