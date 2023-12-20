import './App.css'

import Form from './components/Form'

export default function App() {
  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Form />
      </div>
    </div>
  );
}