from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import flask
app = Flask(__name__,static_url_path='')
CORS(app)

# Run inference
@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/get_title', methods=['GET'])
def get_title():
    print('Getting title...')
    title = 'Virtual Trail Room'
    return jsonify(title)


@app.route('/get_user/<user>')
def get_user(user):
    print('Getting user...')
    user = user
    return jsonify(user)

@app.route('/login',methods=['POST'])
def login():
    uid = request.json.get('id', '')
    password = request.json.get('pass', '')

    print(uid + " " + password)
    if uid == 'sayali' and password == 'sayali@123':
        print("found")
        return flask.jsonify(ok='true')
    return flask.jsonify(error='Login failed')

@app.route('/api/infer', methods=['POST'])
def infer():
    # Check that the post contains the right fields
    if not all(i in request.files for i in ['person', 'clothing']):
        return jsonify(error = 'Incorrect payload!')

    # Check that the files are images
    if not (request.files['person'].mimetype[:5] == request.files['clothing'].mimetype[:5] == "image"):    
        return jsonify(error = 'Inputs must be images!')

    # Handle data and execute inference
    person_img = request.files['person']
    clothing_img = request.files['clothing']

    person_img.save('./inputs/input_person.jpg')
    clothing_img.save('./inputs/input_clothing.jpg')

    os.system('./run_smartfit.sh ./inputs/input_person.jpg ./inputs/input_clothing.jpg')

    # Check that files exists (i.e. smartfit didn't crash)
    if not os.path.isfile('output/output.png'):
        return jsonify(error = '500: Internal server error')

    return send_from_directory('./output/', 'output.png')


if __name__ == '__main__':
    app.run(debug=True)
