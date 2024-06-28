from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import requests

app = Flask(__name__)
CORS(app)


# Define the endpoint to call the external API
external_api_url = 'https://2dfqvwgk22pui5u7pstc76ehkm0aqhku.lambda-url.us-east-1.on.aws/'

@app.route('/predict', methods=['POST'])
def call_api():
    try:
        # Get the JSON data from the request
        json_data = request.get_json()
        print("Received JSON data:", json_data)
        # Define the headers including the Content-Type
        headers = {
            'Content-Type': 'application/json'
        }
        # Make a POST request to the external API with the JSON data
        response = requests.post(external_api_url, headers=headers,json=json_data)

        # Check if the request was successful
        if response.status_code == 200:
            # Return the JSON response from the external API
            return jsonify(response.json())
        else:
            # Return an error message with the status code
            return jsonify({'error': f'Failed to get data from external API, status code: {response.prediction}'}), response.prediction
    except Exception as e:
        # Handle any exceptions that occur
        return jsonify({'error': str(e)}), 500

app.run(port=5000, debug=True)

