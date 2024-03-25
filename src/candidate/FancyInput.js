import { Input } from 'baseui/input';
import EmojiPicker from './EmojiPicker';
import { useState } from 'react';
import emojis from './emojis.json'

function FancyInput({ placeholder }) {const [value, setValue] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [emojiSearchTerm, setEmojiSearchTerm] = useState('');

    // TODO: abstract this function? so it dont have to pass emojis as a prop
    // filter emoji by their name
    const filterEmojis = (searchTerm) => {
        // TODO: add emoji categories and improve search functionality
        return emojis.filter((emoji) => {
            return (emoji.name).toLowerCase().includes(searchTerm.slice(1).toLowerCase());
        })
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);

        // check if the input contains a colon followed by 2 or more alphanumeric characters
        const regex = /:\w{2,}/;
        if (regex.test(inputValue)) {
            // check if the input contains a colon followed by 2 or more alphanumeric characters FOLLOWED BY A SPACE
            const regexWithSpaceAppended = /:\w{2,}\s/;
            if (showPicker && regexWithSpaceAppended.test(inputValue)) {
                setShowPicker(false);
                return;
            }

            // if the regex test is true, return matching string
            const match = inputValue.match(regex)[0];
            // this might cause some perfomance problems, there is probably a more efficient way to achieve this
            const filteredEmojis = filterEmojis(match);
            if (filteredEmojis.length === 0) {
                setShowPicker(false);
                return;
            }

            setEmojiSearchTerm(match);
            setShowPicker(true);
        } else {
            // if the regex test is false, reset emojiSearchTerm and hide the picker
            setEmojiSearchTerm('');
            setShowPicker(false);
        }
    };

    const handleSelectEmoji = (emoji) => {
        const regex = /:\w{2,}/;
        // replace matched string with selected emoji
        setValue(value.replace(regex, emoji));
    };

    return (
        <div>
            <EmojiPicker emojis={filterEmojis(emojiSearchTerm)} isOpen={showPicker} setIsOpen={setShowPicker} onSelectEmoji={handleSelectEmoji}/>
            <Input
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export { FancyInput };
