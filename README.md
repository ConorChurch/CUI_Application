# Create your own CUI (Chatbot)

This project was created as part of a MSc thesis for the purpose of creating a tool that renders simple CUIs to be used independently or embedded into surveys, such as Qualtrics.

In this README, we will explain how to set up the CUI in your environment and how to use the "input.json" file in the /src folder to ask your desired questions and possible answers (if there are in the form of multiple choice).

## Getting Started

### Configure chatbot

In order to run this tool you will need to configure the "input.json" with the different CUI parameters, your questions and the type of answers you would like from the user of the CUI.

The "input.json" file is a JSON file with some parameters. First within the "Parameters" array, the set of parameters relating to the Avatar that will display to the user:

    "Avatar Image": "/images/AvatarMaker.png",
    "Avatar Name": "Amy"
    
    "Avatar Image" - is the location of the photo that shows the Avatar's face, for the best quality, the photo should be a 20x20 pixel photo.

*** Make sure you save the photo named "AvatarMaker.png" in the "public/images/" directory for the photo to render properly ***

    "Avatar Name" - is the name that will render at the top of the Screen

The last parameter to be configured is the "Server Address" parameter:

    "Server Address": "http://127.0.0.1:33507"

    By default, the Server address is the localhost with a port of 33507.
    This is changed to the server address where you hope to host the tool.
    Make sure that the port 33507 is available, or if you would like to change to a different port, this can be done in the "flask/save_conversation.py" file on line 99, change the port number 33507 to your available port number.
 

Next is the "Conversation" array, which contains the number of questions that will be asked to the user.

Each element has the type of answer expected from the question: "free" (free text) or "choice" (multiple choice), the "Message" to be displayed to the user (the question itself) and in the case of multiple choice questions, there is an array "Choices", that houses each "Answer" that the user can choose from.
There are examples of both of these in the sample input.json in the repository and shown below:

        {
            "Type": "free",
            "Message": "Where do you live?"
        },
        {
            "Type": "choice",
            "Message": "What's the weather like?",
            "Choices": [
                {
                    "Answer": "Warm"
                },
                {
                    "Answer": "Cold"
                },
                {
                    "Answer": "Windy"
                }
            ]
        },


For the "choice" questions, that will be an array in itself with the different answer choices. There will be a limit of four answers for the multiple choice questions. If more than four answers are given, only the first four will be rendered to the screen.

For the "choice" question, each "Answer" will have a limit of 32 characters on the phone option and 30 for the monitor options before these answers will be cut off.
These are based off of a small phone screen and small laptop screen, so the bigger the screen on each, the more characters before they are cut off.

It is possible to nest choice questions within each other to provide different routes or conversations with different users. 

An example of how to structure this is in the "input.json" file and below. Depending on how a user is feeling they will receive a different follow-up question. Each answer in a multiple choice question is an object in order to check if it has another "choice" attribute for another question.

In the example below, the below multiple choice question will render three options "Good", "Bad" and "Indifferent".
Selecting "Good" will prompt another multiple choice question, "Bad" a free text question and "Indifferent" will have not have a nested question.

It is recommended you render the tool with the sample question and answers to help undersatnd before changing.


        {
            "Type": "choice",
            "Message": "How are you feeling today?",
            "Choices": [
                {
                    "Answer": "Good",
                    "Type": "choice",
                    "Message": "Why good?",
                    "Choices": [
                        {
                            "Answer": "The Sun is out"
                        },
                        {
                            "Answer":"I'm going to play Frisbee"
                        },
                        {
                            "Answer":"I got this working"
                        }
                    ]
                },
                {
                    "Answer": "Bad",
                    "Type": "free",
                    "Message": "Why bad?"
                },
                {
                    "Answer": "Indifferent"
                }
            ]
        },


Lastly the farewell message that is displayed to the user when the conversation has ended.
This is a simple message that can be changed to any length.

### Configure output

Currently the results of the conversation will be sent to the backend server at the "/save" endpoint. 

*** Make sure you allow traffic to the backend server or ask your adminstrator to allow port access to the backend server ***

Another solution is to have a reverse proxy to allow traffic to the backend server.

You will need to change "Server Address" parameter in the input.json file to the url address you are running the server on.

#### Encryption and Database

When the conversation runs it will automatically encrypt the conversation and save it locally in the 
"/conversations" folder.
These are created with name "output" and the the current timestamp of CUI completion appended to the end. 

At the end of the conversation if you wish to decrypt the the conversation, from the "/flask" directory, please run:

### `python3 decrypt.py ../conversations/<name of file>`

"<name of file>" denotes the output file you wish to decrypt. They will be saved in the "conversations" folder.

##### Cloud option

If you wish to pair your cloud provider storage this tool caters to that too.

The Cloud storage currently used is Google Cloud, which will store your each conversation file in a bucket.

In order to set up the storage, please follow the instructions here:

https://cloud.google.com/storage/docs/reference/libraries

Once you have created the json key file, copy and paste the contents to the "GOOGLE_APPLICATION_CREDENTIALS.json" file found in the flask folder.

This should configure when the application is run.
It will create a blob called "cui_storage" and a bucket called "CUI_Storage" and store each conversations in there.


## Running the tool

You will need npm, pip and python to run this tool. 
The download pages on these can be found here:

npm - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

python - https://www.python.org/downloads/

pip - https://pip.pypa.io/en/stable/installation/


In the project directory, you can run:

### `npm install`

This will install the node modules needed to run the tool

### `pip install -r requirements.txt`

This will install the packages needed to run the tool

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

*** Run this command each time the configuration file or any file outside the "/flask" folder has been changed *** 

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

*** It is not needed for running the tool ***


### Deployment

In the "/flask" folder, you can run:

### `python save_conversation.py` or `python3 save_conversation.py`

This will run the server to receive the incoming conversation and deploy the built frontend to the server.


### `docker build -t <name of image> .` and `docker run -p 33507:33507 --name <name of container> <name of image>`

If you have Docker installed, you can run the commands above.
They will perform all the commands from "npm install" to deploying the application.
It will then be hosted in a Docker container on your server space. 