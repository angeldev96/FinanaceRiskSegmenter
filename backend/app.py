from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import logging

app = Flask(__name__)
CORS(app)

# Load the model during application startup
model = joblib.load('models/risk.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint for making predictions based on input data.

    Returns:
        JSON: The prediction result as a JSON object.
    """
    try:
        # Get data from the request
        json_data = request.json

        # Validate input data
        validate_input(json_data)

        # Convert the data into a DataFrame
        prediction_data = pd.DataFrame([json_data])

        # Make prediction using the loaded model
        prediction_result = model.predict(prediction_data)

        # Return the result as JSON
        return jsonify({'prediction': prediction_result.tolist()})
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        return jsonify({'error': 'An error occurred'}), 500

def validate_input(data):
    # Implement input validation logic here
    pass

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    app.run(debug=True)
