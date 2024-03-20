# Chatbot Component

This repository contains a versatile chatbot component suitable for various applications where a chatbot is required. With seamless integration and dynamic output functionalities, users can interact with the chatbot to achieve their objectives effectively. The chatbot supports various output types, including messages, multi-choice prompts, questions with input fields, and multi-select options. Additionally, users can upload media to Firestore directly through the chatbot interface.

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
    "uid": "your_uid_here",
    "bid": "your_bid_here",
    "logoImage": "",
    "toggleImage": "",
    "subTitle": "Ask - Chat Now",
    "plan_type": "admin"
  }
```
Replace "your_uid_here" and "your_bid_here" with your actual Firestore user ID and bot ID respectively

## Usage

To integrate the chatbot component into your application, follow these steps:

1. **Clone the Repository:** Clone this repository to your local machine.

```bash
git clone https://github.com/Mrityunjay383/Chatbot.git
```

2. **Configure Firestore:** Set up Firestore database credentials and configurations as per your requirements.
3. **Integrate into Your Application: ** Integrate the chatbot component into your application codebase. Import the necessary React components and set up server-side logic using Node.js and Express.js.
4. **Run the Application: ** Start the application server and launch the chatbot interface in your preferred browser.

## Contributing
Contributions to this project are welcome. If you have any ideas for improvements, or feature requests, or encounter any issues, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
