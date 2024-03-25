
# Let's Do This Front End Coding Challenge - Emoji Picker
Run the app using `yarn && yarn start` and open http://localhost:3000 in your browser to view instructions.

## Overview of Solution
Here is my solution for the Let's Do This Front End coding challenge. I've successfully implemented the emoji picker as per the provided requirements (except one). Here's a rundown of what I've accomplished:

### Emoji Picker Implementation
I've added an emoji picker component to the input element provided in the FancyInput.js file. The picker activates when the user types a colon (:) character followed by 2 or more alphanumeric characters, similar to Slack.

#### User Interaction
The emoji picker menu remains open until one of the following conditions is met:

- The user selects an emoji.
- The user types a space.
- The user types a character sequence that doesn't match any emoji.
- ~~The user moves the cursor to another part of the input.~~ Unfortunetly I couldn't quite get this to work within the time frame. I also had some clarifying questions about this particular requirement.
- Once the user selects an emoji, it is appropriately appended to the value of the input, replacing the string that triggered the picker.

### Areas for Improvement
I treated this challenge as a rapid proof of concept test, focusing on functionality over style and effeciency. If I had more time (or we decided to move ahead with the implementation), there are a few things I would improve/focus on (in no particular order):

- Finish the cursor requirement.
- Use a comprehensive list of emojis, there are a few packages floating around for this.
- Update the styling and design.
- Update the useablity, specifically around some issues I had on maintaining focus on the input when the emojiPicker opened
- Find a more effecient way to filter the emjoi data, and also be able to filter it based on categories or descriptors (i.e. :face would come up with all emjois that have faces)
- Write more/better tests with edge cases for improved coverage

### Tests
I wrote a handful of tests, but i had to downgrade @testing-library/react to v12 to get my tests to work.

To run the tests use `npm test`.


### Conclusion
I hope this helps you understand my approach to software engineering (under tightframes). Please reach out to me if you have any questions. Looking forward to hearing from you :)
