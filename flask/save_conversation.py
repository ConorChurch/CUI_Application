import os
import logging
from unicodedata import name
from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime
from encrypt import encrypt
from key_generation import key_generation
from send_to_database import send_to_database


""" 

Point flask to the build directory to obtain the index.html
Route to display html file at home route

"""

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)

app.logger.setLevel(logging.INFO)

@app.route('/')
def index():
    return app.send_static_file('index.html')



""" 

Route for directing the conversation to "/save"

Checks for encryption key existence and database config file 

"""

# Serve React App
@app.route('/save', defaults={'path': ''}, methods=["POST"])
def serve(path):
    date = datetime.datetime.now()
    data = request.get_json(force=True)
    print(data)

    # Create a file and write the conversation to it
    relative_conversation_path = os.path.relpath("/my-cui-app/conversations/", "/my-cui-app")
    name_of_file = os.path.join(relative_conversation_path,"output"+str(date)+".txt")
    with open(name_of_file, "w") as f:
        for item in data:
            f.write("%s\n" % item)
        print("Done")

    # Check if the database credentials exist and/or push to database
    checkForDatabase(date)
    relative_path = os.path.relpath("/my-cui-app/filekey.key", "/my-cui-app")
    # If the key file does not exists then use it, else create new one
    if os.path.exists(relative_path) != True:
        print("New Key Generated") 
        key_generation()

    # Call the encryption function to encrypt the file
    encrypt(date)
    return jsonify(data)

""" 

Function checking if the database credentials are empty
if they are present then the function for sending it to the database is envoked
if not then a print statement is executed

Arguments:

Date that the conversation was completed

"""

def checkForDatabase(date):
    relative_path = os.path.relpath("/my-cui-app/flask/GOOGLE_APPLICATION_CREDENTIALS.json", "/my-cui-app")
    if os.stat(relative_path).st_size != "":
        print("Database available")
        send_to_database(date)
    else:
        print("No Database available")




if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, threaded=True, host="0.0.0.0", port=int(os.environ.get('PORT', 33507)))