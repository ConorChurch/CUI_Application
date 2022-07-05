import os
import sys
import logging
from urllib import response
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import datetime
from key_generation import key_generation


API_KEY = ""
key = ""
date = datetime.datetime.now()


app = Flask(__name__, static_folder='/')
CORS(app)


app.logger.setLevel(logging.INFO)

# Serve React App
@app.route('/save', defaults={'path': ''}, methods=["POST"])
#@app.route('/<path:path>', methods=["POST"])
def serve(path):
    print("test")
    print("hello", file=sys.stderr)

    data = request.get_json(force=True)
    print(data)

    with open("output"+date+".txt", "w") as f:
        for item in data:
            f.write("%s\n" % item)
        print("Done")

    key_generation(date)
    checkForDatabase()         

    return jsonify(data)
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        print("We made it", file=sys.stderr)
        return send_from_directory(app.static_folder, path)
    else:
        print("We didn't make it", file=sys.stderr)

        return send_from_directory(app.static_folder, 'index.html')

def checkForDatabase():
    if API_KEY != "":
        print("Database available")
    else:
        print("No Database available")





if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, threaded=True, host="0.0.0.0", port="28001")