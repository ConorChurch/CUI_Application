from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/save", methods=["POST"])
def saveConversation():

    data = request.get_json(force=True)
    print(data)
    return jsonify(data)

if __name__ == '__main__':
    app.run()