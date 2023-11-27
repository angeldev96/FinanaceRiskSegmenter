from flask import Flask, request, jsonify
from flask_cors import CORS

import joblib
import pandas as pd

app = Flask(__name__)

CORS(app)

# Cargar el modelo al iniciar la aplicación
modelo = joblib.load('models/risk.pkl')

@app.route('/predecir', methods=['POST'])
def predecir():
    # Obtener datos de la solicitud
    datos_json = request.json
    # Convertir los datos en un DataFrame
    datos_para_prediccion = pd.DataFrame([datos_json])
    # Realizar la predicción usando el modelo cargado
    resultado_prediccion = modelo.predict(datos_para_prediccion)
    # Devolver el resultado como JSON
    return jsonify({'prediccion': resultado_prediccion.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
