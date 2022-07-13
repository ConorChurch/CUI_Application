import os
import sys
import logging
from urllib import response
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import datetime
from encrypt import encrypt
import json
from send_to_database import send_to_database


app = Flask(__name__, static_folder='/')
CORS(app)

app.logger.setLevel(logging.INFO)

# Serve React App
@app.route('/save', defaults={'path': ''}, methods=["POST"])
def serve(path):
    print("test")
    print("hello", file=sys.stderr)
    date = datetime.datetime.now()
    data = request.get_json(force=True)
    print(data)

    with open("output"+str(date)+".txt", "w") as f:
        for item in data:
            f.write("%s\n" % item)
        print("Done")

    checkForDatabase(date) 
    encrypt(date)
    return jsonify(data)


def checkForDatabase(date):

    if os.stat("./GOOGLE_APPLICATION_CREDENTIALS.json").st_size == "":
        print("Database available")
        send_to_database(date)
    else:
        print("No Database available")




if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, threaded=True, host="0.0.0.0", port="28001")