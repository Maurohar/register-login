import "./App.css";
import SignUpForm from "./Componentes/SignUpForm.tsx";

function App() {
  return (
    <main className="App">
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Bienvenido a Nuestra Red Social
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-96">
          <SignUpForm />
        </div>
      </div>
    </main>
  );
}

export default App;
