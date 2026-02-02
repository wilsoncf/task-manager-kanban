import { KanbanBoard } from './features/tasks/components/KanbanBoard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <main className="bg-slate-200 min-h-screen p-4 sm:p-6 lg:p-8">
      <Toaster position="top-center" reverseOrder={false} />
      <KanbanBoard />
    </main>
  );
}

export default App;
