from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from database import get_db_connection, create_tables

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Create tables on startup
create_tables()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    conn = get_db_connection()
    cursor = conn.cursor()

    # Insert contact message into database
    cursor.execute('INSERT INTO contacts (name, email, message) VALUES (%s, %s, %s)', (name, email, message))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'status': 'success', 'message': 'Message received!'}), 201

if __name__ == '__main__':
    app.run(debug=True)

