// Versão simplificada para teste
const App = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">PromptCraft Edu</h1>
      <p className="mb-4">Aplicação para formação de professores em escrita de prompts.</p>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Começar
      </button>
    </div>
  );
};

// Renderizar a aplicação
ReactDOM.render(<App />, document.getElementById('root'));