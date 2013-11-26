from pymongo import MongoClient
from bson.objectid import ObjectId
import json
import os

'''
Helper function to save & load data from mongodb
'''

def save_quiz(json_data):
	if "MONGOHQ_URL" in os.environ:
		client = MongoClient(os.environ['MONGOHQ_URL'])
	else:
		client = MongoClient()
	db = client.get_default_database()
	quizzes = db.quizzes
	return str(quizzes.insert(json.loads(json_data)))

def load_quiz(mongo_id):
	if "MONGOHQ_URL" in os.environ:
		client = MongoClient(os.environ['MONGOHQ_URL'])
	else:
		client = MongoClient()
	client = MongoClient()
	db = client.get_default_database()
	quizzes = db.quizzes
	return quizzes.find_one({'_id': ObjectId(mongo_id)})