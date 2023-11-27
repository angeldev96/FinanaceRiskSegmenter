import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
import joblib


# Generar datos ficticios de clientes
np.random.seed(0)
n_samples = 1000000

# Variables ficticias
edad = np.random.randint(18, 70, n_samples)
ingresos = np.random.uniform(10000, 1000000, n_samples)
deuda_crediticia = np.random.uniform(0, 100000, n_samples)
historial_pago = np.random.randint(0, 3, n_samples)
nacionalidad = np.random.choice(['Nacional', 'Extranjero'], size=n_samples)


# Crear un DataFrame
data = pd.DataFrame({
    'Edad': edad,
    'Ingresos': ingresos,
    'Deuda_Crediticia': deuda_crediticia,
    'Historial_Pago': historial_pago,
    'Nacionalidad': nacionalidad
})


# Seleccionar características relevantes
X = data[['Edad', 'Ingresos', 'Deuda_Crediticia', 'Historial_Pago']]


# Aplicar el algoritmo K-Means para segmentar a los clientes
n_clusters = 3
kmeans = KMeans(n_clusters=n_clusters, random_state=0)
data['Segmento'] = kmeans.fit_predict(X)
#0: Bajo, 1:Medio, 2:Alto

# Dividir los datos en conjuntos de entrenamiento y prueba
X = data[['Edad', 'Ingresos', 'Deuda_Crediticia', 'Historial_Pago']]
y = data['Segmento']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

# Dividir los datos en conjuntos de entrenamiento y prueba
X = data[['Edad', 'Ingresos', 'Deuda_Crediticia', 'Historial_Pago']]
y = data['Segmento']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)


# Crear y entrenar un modelo de Random Forest para predecir el riesgo
model = RandomForestClassifier(n_estimators=100, random_state=0)
model.fit(X_train, y_train)

nombre_del_archivo = 'risk.pkl'
joblib.dump(model, nombre_del_archivo)

print("Modelo guardado con éxito.")

# Realizar predicciones en el conjunto de prueba
y_pred = model.predict(X_test)

# Evaluar el modelo
print("Matriz de confusión:")
print(confusion_matrix(y_test, y_pred))

print("\nInforme de clasificación:")
print(classification_report(y_test, y_pred, target_names=['Bajo', 'Medio', 'Alto']))


