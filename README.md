# Create your own CUI (Chatbot)

This project was created as part of a MSc thesis for the purpose of creating a tool that renders simple CUIs to be used independently or embedded into surveys, such as Qualtrics.

In this README, we will explain how to set up the CUI in your environment and how to use the "input.json" file in the /src folder to ask your desired questions and possible answers (if there are in the form of multiple choice).

## Getting Started

### Configure chatbot

In order to run this tool you will need to configure the "input.json" with your Questions and the type of answers you would like from the user of the CUI and the type of screen the users will be using.

The "input.json" file is a JSON file with some parameters. First within the "Parameters" array, the "Screen Type" parameter is for the type of screen the users will be using to interact with the CUI. 

Changing the value to:

    "phone" - is for most handheld devices e.g phones, tablets etc.
    "monitor" - is for most larger screen types e.g laptops, pc monitors etc.

Next is the "Conversation" array, which contains the number of questions that will be asked to the user.

Each element has the Question number, the type of answer expected from the question: "free" (free text) or "choice" (multiple choice).
There are examples of both of these in the sample input.json in the repository.
The third part of each question is the message of the question to be asked.

For the "choice" questions, that will be an array in itself with the different answer choices. There will be a limit of four answers for the multiple choice questions. 

Lastly the farewell message that is displayed to the user when the conversation has ended.

### Configure output

Currently the results of the conversation will be sent to the backend server at the "/save" endpoint. You will have to run both the frontend and backend on your webspace to make sure it properly accepts requests.

*** Make sure you allow traffic to the backend server or ask your adminstrator to allow port access to the backend server ***

Another solution is to have a reverse proxy to allow traffic to the backend server.

You will need to change "UserConvo.jsx" on line 133 to the url to the address you are running the server on. Make sure to keep the "/save" endpoint at the end of your url so the conversation is sent to the backend e.g "<your url>/save".

#### Encryption and Database

(TO DO)


## Running the tool


In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)


In the "/flask", you can run:

### `python saveConversationAPI.py` or `python3 saveConversationAPI.py`

This will run the server to receive the incoming conversation.