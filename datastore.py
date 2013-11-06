from pymongo import MongoClient
from bson.objectid import ObjectId
import json

'''
Helper function to save & load data from mongodb
'''

def save_quiz(json_data):
	client = MongoClient()
	db = client.quiz_database
	quizzes = db.quizzes
	return str(quizzes.insert(json.loads(json_data)))

def load_quiz(mongo_id):
	client = MongoClient()
	db = client.quiz_database
	quizzes = db.quizzes
	return quizzes.find_one({'_id': ObjectId(mongo_id)})