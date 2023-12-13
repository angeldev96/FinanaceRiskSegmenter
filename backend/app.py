from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import logging

app = Flask(__name__)
CORS(app)

# Load the model during application startup
modelo = joblib.load('models/risk.pkl')

@app.route('/predecir', methods=['POST'])
def predecir():
    try:
        # Get data from the request
        datos_json = request.json

        # Validate input data
        validate_input(datos_json)

        # Convert the data into a DataFrame
        datos_para_prediccion = pd.DataFrame([datos_json])

        # Make prediction using the loaded model
        resultado_prediccion = modelo.predict(datos_para_prediccion)

        # Return the result as JSON
        return jsonify({'prediccion': resultado_prediccion.tolist()})
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        return jsonify({'error': 'An error occurred'}), 500

def validate_input(data):
    # Implement input validation logic here
    pass

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    app.run(debug=True)
