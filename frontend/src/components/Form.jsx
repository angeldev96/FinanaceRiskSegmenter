import { useState } from 'react'

const Form = () => {
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
    <div className="w-full max-w-md">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Formulario de Predicción</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        {/* Edad */}
        <div className="mb-5">
          <input
            type="number"
            name="Edad"
            value={formData.Edad}
            onChange={handleChange}
            placeholder="Edad"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-grey dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Ingresos */}
        <div className="mb-5">
          <input
            type="number"
            name="Ingresos"
            value={formData.Ingresos}
            onChange={handleChange}
            placeholder="Ingresos"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-grey dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Deuda Crediticia */}
        <div className="mb-5">
          <input
            type="number"
            name="Deuda_Crediticia"
            value={formData.Deuda_Crediticia}
            onChange={handleChange}
            placeholder="Deuda Crediticia"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-grey dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Historial de Pago */}
        <div className="mb-5">
          <input
            type="number"
            name="Historial_Pago"
            value={formData.Historial_Pago}
            onChange={handleChange}
            placeholder="Historial de Pago"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-grey dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Botón Enviar */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Enviar
          </button>
        </div>
      </form>

      {prediction !== null && (
        <div className="w-full max-w-md mt-4">
          <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-2 text-gray-800">Resultado de la Predicción</h2>
            <p className="text-gray-700">Segmento: {prediction === 2 ? "Alto" : prediction === 1 ? "Medio" : "Bajo"}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Form;