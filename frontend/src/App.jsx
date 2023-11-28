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
      const response = await fetch('http://54.174.83.82:5000/predecir', {
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
    <div className="App bg-gray-100 min-h-screen flex flex-col items-center justify-center">
    <div className="w-full max-w-xs">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-700">Formulario de Predicción</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="Edad"
                    value={formData.Edad}
                    onChange={handleChange}
                    placeholder="Edad"
                />
            </div>
            <div className="mb-4">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="Ingresos"
                    value={formData.Ingresos}
                    onChange={handleChange}
                    placeholder="Ingresos"
                />
            </div>
            <div className="mb-4">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="Deuda_Crediticia"
                    value={formData.Deuda_Crediticia}
                    onChange={handleChange}
                    placeholder="Deuda Crediticia"
                />
            </div>
            <div className="mb-6">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="Historial_Pago"
                    value={formData.Historial_Pago}
                    onChange={handleChange}
                    placeholder="Historial de Pago"
                />
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Enviar
                </button>
            </div>
        </form>
    </div>
    {prediction !== null && (
        <div className="w-full max-w-xs mt-4">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-bold mb-2 text-gray-700">Resultado de la Predicción</h2>
                <p className="text-gray-600">Segmento: {prediction === 2 ? "Alto" : prediction === 1 ? "Medio" : "Bajo"}</p>
            </div>
        </div>
    )}
</div>

  );
}

export default App;
