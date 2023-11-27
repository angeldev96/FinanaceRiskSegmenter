import { useState } from 'react'
import './App.css'

function App() {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    Edad: '',
    Ingresos: '',
    Deuda_Crediticia: '',
    Historial_Pago: ''
  });

  // Estado para almacenar la predicción
  const [prediction, setPrediction] = useState(null);

  // Manejador para los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejador para el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predecir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPrediction(data.prediccion[0]); // Actualiza el estado con la respuesta del servidor
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className="App">
      <h1>Formulario de Predicción</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="Edad"
          value={formData.Edad}
          onChange={handleChange}
          placeholder="Edad"
        />
        <input
          type="number"
          name="Ingresos"
          value={formData.Ingresos}
          onChange={handleChange}
          placeholder="Ingresos"
        />
        <input
          type="number"
          name="Deuda_Crediticia"
          value={formData.Deuda_Crediticia}
          onChange={handleChange}
          placeholder="Deuda Crediticia"
        />
        <input
          type="number"
          name="Historial_Pago"
          value={formData.Historial_Pago}
          onChange={handleChange}
          placeholder="Historial de Pago"
        />
        <button type="submit">Enviar</button>
      </form>

      {/* Sección para mostrar la predicción */}
      {prediction !== null && (
        <div>
          <h2>Resultado de la Predicción</h2>
          <p>Segmento: {prediction === 2 ? "Alto" : prediction === 1 ? "Medio" : "Bajo"}</p>
        </div>
      )}
    </div>
  );
}

export default App;
