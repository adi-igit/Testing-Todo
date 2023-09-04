import TodoApp from "./components/TodoApp";

function App() {
  return (
    <div className='min-h-screen flex flex-col gap-5 items-center justify-center'>
      <header>
        <h1 className="text-6xl font-[300] text-[pink]">todos</h1>
      </header>
      <main className='border px-10 py-5'>
        <TodoApp />
      </main>
    </div>
  );
}

export default App;
