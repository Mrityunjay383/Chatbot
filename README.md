# Chatbot Component

This versatile chatbot component offers seamless integration and dynamic output functionalities for diverse applications. With support for messages, multi-choice prompts, questions with input fields, and multi-select options, users can interact effectively. Plus, it enables direct media uploads to Firestore, enhancing the interactive experience

## Technologies Used

- **React**: Frontend framework for building interactive user interfaces.
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web application framework for Node.js, facilitating server-side development.
- **Firestore**: Flexible, scalable database for storing and managing data.

## Output Functionalities

The chatbot component offers the following output functionalities:

- **Message**: Displays a message in the chat window to communicate information or instructions.
- **Multi Choice**: Presents users with a message and multiple options to choose from, facilitating decision-making.
- **Question**: Displays a question to users along with an input field, enabling them to provide input or responses.
- **Multi Select**: Provides users with a message and multiple options, allowing them to select multiple choices simultaneously.
- **Media Upload to Firestore**: Users can upload media directly to Firestore through the chatbot interface, enhancing the interactive experience and enabling seamless sharing of relevant content.

## Usage

To integrate the chatbot component into your application, follow these steps:

1. **Clone the Repository:** Clone this repository to your local machine.

```bash
git clone https://github.com/Mrityunjay383/Chatbot.git
```

2. **Configure Firestore:** Set up Firestore database credentials and configurations as per your requirements.
3. **Integrate into Your Application: ** Integrate the chatbot component into your application codebase. Import the necessary React components and set up server-side logic using Node.js and Express.js.
4. **Run the Application: ** Start the application server and launch the chatbot interface in your preferred browser.

## Bot Config Example

```json
{
  "config": {
    "active": true,
    "includeURLs": [""],
    "excludeURLs": [""],
    "botPosition": "center",
    "delay": "2",
    "botColor2": "#c0e571",
    "botName": "Chatbot",
    "botColor": "#59a669",
    "logoImage": "",
    "toggleImage": "",
    "subTitle": "Ask - Chat Now",
    "plan_type": "admin"
  }
```

### Bot Configuration

The bot configuration (`config`) section allows you to customize various aspects of the chatbot's behavior and appearance. Here's an explanation of each parameter:

- **active**: Determines whether the bot is active or not.
- **botPosition**: Specifies the position of the bot within the user's browser window.
- **delay**: Sets the delay (in seconds) before the bot replies to the user.
- **botColor2**: Defines the secondary color of the bot for visual appeal.
- **botName**: Displays the name of the chatbot at the top of the chat window.
- **logoImage**: Allows you to display a brand logo on the chat window. Provide a URL of an image for this purpose.
- **subTitle**: Provides a sub-title to be displayed on the chat window, enhancing user engagement.

Customize these parameters according to your requirements to tailor the chatbot's behavior and appearance to suit your application's needs.


## Contributing
Contributions to this project are welcome. If you have any ideas for improvements, or feature requests, or encounter any issues, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
