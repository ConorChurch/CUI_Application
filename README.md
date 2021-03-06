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

For the "choice" questions, each answer will have a limit of 32 characters on the phone option and 30 for the monitor options before these answers will be cut off.
These are based off of a small phone screen and small laptop screen, so the bigger the screen on each, the more characters before they are cut off.

It is possible to nest choice questions within each other to provide different routes or conversations with different users. An example of how to structure this is in the "input.json" file. Depending on how a user is feeling they will receive a different follow-up question. Each answer in a multiple choice question is an object in order to check if it has another "choice" attribute for another question.

Lastly the farewell message that is displayed to the user when the conversation has ended.

### Configure output

Currently the results of the conversation will be sent to the backend server at the "/save" endpoint. You will have to run both the frontend and backend on your webspace to make sure it properly accepts requests.

*** Make sure you allow traffic to the backend server or ask your adminstrator to allow port access to the backend server ***

Another solution is to have a reverse proxy to allow traffic to the backend server.

You will need to change "Server Address" parameter in the input.json file to the url address you are running the server on.

#### Encryption and Database

When the conversation runs it will automatically encrypt the conversation and save it locally in the "/flask" folder.
These are created with name "output" and the the current timestamp of CUI completion appended to the end. 

***In order to encrypt and decrypt the files you will first need to create an ecnryption key.***

This can be done by running:

### `python3 key_generation.py`

This will create a file "filekey.key". Once created, please add the key to the "Encryption/Decryption Key" parameter in the input.json file.

At the end of the conversation if you wish to decrypt the the conversation, please run:

### `python3 decrypt.py <name of file>`

"<name of file>" denotes the output file you wish to decrypt.

##### Cloud option

If you wish to pair your cloud provider storage this tool caters to that too.

The Cloud storage currently used is Google Cloud, which will store your each conversation file in a bucket.

In order to set up the storage, please follow the instructions here:

https://cloud.google.com/storage/docs/reference/libraries

Once you have created the json key file, copy and paste the contents to the "GOOGLE_APPLICATION_CREDENTIALS.json" file found in the flask folder.

This should configure when the application is run.


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


In the "/flask" folder, you can run:

### `python saveConversationAPI.py` or `python3 saveConversationAPI.py`

This will run the server to receive the incoming conversation.