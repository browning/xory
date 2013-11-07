from flask import Flask
from flask import render_template, request, jsonify
import datastore

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/save", methods=['POST'])
def save():
	return datastore.save_quiz(request.data)

@app.route("/quiz/<quiz_id>")
def show_grid(quiz_id):
	data = datastore.load_quiz(quiz_id)
	data['_id'] = str(data['_id'])
	return jsonify(quiz=data)

if __name__ == "__main__":
    app.run(debug=True)