import React from 'react';
import { StatefulMenu } from 'baseui/menu';

const EmojiPicker = ({ emojis, isOpen, setIsOpen, onSelectEmoji }) => {
    const handleSelectEmoji = ({ item }) => {
        onSelectEmoji(item.label);
        setIsOpen(false);
    };

    return (
        <>
            {isOpen && <StatefulMenu items={emojis} onItemSelect={handleSelectEmoji}/>}
        </>
    );
};

export default EmojiPicker;