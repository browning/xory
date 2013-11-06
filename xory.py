from flask import Flask
from flask import render_template, request
import datastore

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/save", methods=['POST'])
def save():
	return datastore.save_quiz(request.data)

if __name__ == "__main__":
    app.run()