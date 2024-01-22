from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import logging

app = Flask(__name__)
CORS(app)

# Load the model at application startup
model = joblib.load('models/risk.pkl')

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint for making predictions based on input data.

    Returns:
        JSON: The prediction result as a JSON object.
    """
    try:
        # Retrieve data from the request
        json_data = request.json

        # Validate the input data
        validate_input(json_data)

        # Convert the data into a DataFrame
        data_for_prediction = pd.DataFrame([json_data])

        # Make a prediction using the loaded model
        prediction_result = model.predict(data_for_prediction)

        # Return the result as JSON
        return jsonify({'prediction': prediction_result.tolist()})
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        return jsonify({'error': 'An internal server error occurred'}), 500

def validate_input(data):
    required_fields = ['age', 'job', 'marital', 'education', 'default', 'balance', 'housing', 'loan', 'contact', 'day', 'month', 'duration', 'campaign', 'pdays', 'previous', 'poutcome']

    if not all(field in data for field in required_fields):
        raise ValueError("Missing one or more required fields")


if __name__ == '__main__':
    app.run(debug=True)
