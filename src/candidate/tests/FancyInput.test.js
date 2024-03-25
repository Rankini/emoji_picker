import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FancyInput } from '../FancyInput';
import '@testing-library/jest-dom/extend-expect';

const defaultPlaceholder = 'Please make me fancy 🤩';

describe('FancyInput', () => {
    test('Ensure emoji picker renders when typing colon followed by 2 or more alphanumeric characters', () => {
        const { getByPlaceholderText, queryByText } = render(<FancyInput placeholder={defaultPlaceholder} />);
        const input = getByPlaceholderText(defaultPlaceholder);

        fireEvent.change(input, { target: { value: ':sm' } });
        expect(queryByText('😀')).toBeInTheDocument();
    });

    test('Ensure emoji picker renders correct emoji in emoji picker when typing colon followed by 2 or more alphanumeric characters', () => {
        const { getByPlaceholderText, queryByText } = render(<FancyInput placeholder={defaultPlaceholder} />);
        const input = getByPlaceholderText(defaultPlaceholder);

        fireEvent.change(input, { target: { value: ':cat' } });
        expect(queryByText('😸')).toBeInTheDocument();
        expect(queryByText('😀')).not.toBeInTheDocument();
    });

    test('Ensure emoji picker does not render when inputting a single alphanumeric character or special characters', () => {
        const { getByPlaceholderText, queryByText } = render(<FancyInput placeholder={defaultPlaceholder} />);
        const input = getByPlaceholderText(defaultPlaceholder);

        fireEvent.change(input, { target: { value: ':s' } });
        expect(queryByText('😀')).not.toBeInTheDocument();

        fireEvent.change(input, { target: { value: ': ' } });
        expect(queryByText('😀')).not.toBeInTheDocument();
    });

    test('Ensure emoji picker does not render when typing does not match emoji trigger', () => {
        const { getByPlaceholderText, queryByText } = render(<FancyInput placeholder={defaultPlaceholder} />);
        const input = getByPlaceholderText(defaultPlaceholder);

        fireEvent.change(input, { target: { value: 'No emoji trigger here' } });
        expect(queryByText('😀')).not.toBeInTheDocument();
    });

    test('Ensure emoji picker closes when selecting an emoji', () => {
        const { getByPlaceholderText, queryByText } = render(<FancyInput placeholder={defaultPlaceholder} />);
        const input = getByPlaceholderText(defaultPlaceholder);

        fireEvent.change(input, { target: { value: ':sm' } });
        const emojiPicker = queryByText('😀');

        fireEvent.click(emojiPicker);
        expect(input.value).toBe('😀');
    });

    test('Ensure emoji picker closes when typing a space', () => {
        const { getByPlaceholderText, queryByText } = render(<FancyInput placeholder={defaultPlaceholder} />);
        const input = getByPlaceholderText(defaultPlaceholder);

        fireEvent.change(input, { target: { value: ':sm' } });
        fireEvent.change(input, { target: { value: ':sm ' } });
        expect(queryByText('😀')).not.toBeInTheDocument();
    });

    test('Ensure emoji picker closes when moving cursor to another part of the input', () => {
        const { getByPlaceholderText, queryByText } = render(<FancyInput placeholder={defaultPlaceholder} />);
        const input = getByPlaceholderText(defaultPlaceholder);

        fireEvent.change(input, { target: { value: 'Hello :sm' } });
        fireEvent.click(input, { target: { selectionStart: 6, selectionEnd: 6 } });
        expect(queryByText('😀')).not.toBeInTheDocument();
    });

    test('Ensure selected emoji appends to input value, replacing the trigger string', () => {
        const { getByPlaceholderText, queryByText } = render(<FancyInput placeholder={defaultPlaceholder} />);
        const input = getByPlaceholderText(defaultPlaceholder);

        fireEvent.change(input, { target: { value: ':sm' } });
        const emojiPicker = queryByText('😀');

        fireEvent.click(emojiPicker);
        expect(input.value).toBe('😀');
    });

    test('sEnsure selected emoji appends to input value without adding extra spaces', () => {
        const { getByPlaceholderText, queryByText } = render(<FancyInput placeholder={defaultPlaceholder} />);
        const input = getByPlaceholderText(defaultPlaceholder);

        fireEvent.change(input, { target: { value: 'Hello :sm ' } });
        fireEvent.click(input, { target: { selectionStart: 6, selectionEnd: 6 } });
        const emojiPicker = queryByText('😀');

        fireEvent.click(emojiPicker);
        expect(input.value).toBe('Hello 😀 ');
    });
});
