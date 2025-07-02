from flask import Flask, jsonify, request
from datetime import datetime

todo = Flask(__name__) 

todos = []

@todo.route('/')
def home():
    return "Welcome to your TO-DO List"

@todo.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos), 200

@todo.route('/todos', methods=['POST'])
def add_todo():
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify ({'error': 'Title is Required'}), 400
    
    new_todo ={
        'id': len(todos) +1,
        'title': data['title'],
        'Completed': False
    }

    todos.append(new_todo)
    return jsonify(new_todo), 201 #Sends the new task back to the user in JSON format.

@todo.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    data = request.get_json()

    if not data:
        return jsonify ({'error': 'No input data provided'}), 400
    
    if 'title' in data and not isinstance(data['title'], str):
        return jsonify({'error': 'Title must be in Alphabets'}), 400
    
    if 'Completed' in data and not isinstance(data['Completed'], bool):
        return jsonify({'error': 'Enter True or False'}), 400
    
    for todo in todos:
        if todo['id'] == todo_id:
            todo['title'] = data.get('title', todo['title'])
            todo['Completed'] = data.get('Completed', todo['Completed'])
            todo['updated_at'] = datetime.utcnow().isoformat()
            return jsonify(todo), 200
        
    return jsonify({'error': 'To-do not Found'}), 404

@todo.route('/todos/<int:todo_id>', methods=['DELETE'])
def remove_todo(todo_id):
    data = request.get_json()

    if not data or data.get('Confirm') is not True:
        return jsonify({'error': 'Please confirm deletion by setting "Confirm": true in the request body'}), 400
    
    for todo in todos:
        if todo['id'] == todo_id:
            todos.remove(todo)
            return jsonify({'message': 'To-Do deleted successfully'}), 200
    return jsonify({'error': 'To-Do not found'}), 404


if __name__ == '__main__':
    todo.run(debug=True)