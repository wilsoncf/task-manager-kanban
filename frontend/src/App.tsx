import { KanbanBoard } from './features/tasks/components/KanbanBoard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900 font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Container centralizado para telas muito grandes */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <KanbanBoard />
      </div>
    </main>
  );
}

export default App;