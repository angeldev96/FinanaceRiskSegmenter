# backend/routes/prediction.py

from flask import Blueprint, request, jsonify
import pandas as pd
import joblib

# Crear un Blueprint
prediction_bp = Blueprint('prediction_bp', __name__)

# Cargar el modelo (ajustar la ruta si es necesario)
modelo = joblib.load('models/risk.pkl')

@prediction_bp.route('/predecir', methods=['POST'])
def predecir():
    datos_json = request.json
    datos_para_prediccion = pd.DataFrame([datos_json])
    resultado_prediccion = modelo.predict(datos_para_prediccion)
    return jsonify({'prediccion': resultado_prediccion.tolist()})
