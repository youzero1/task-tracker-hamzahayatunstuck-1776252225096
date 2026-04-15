import TodoList from '@/components/TodoList';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-12 sm:py-20">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 sm:text-5xl">
          Todo App
        </h1>
        <p className="mt-2 text-sm text-purple-300/70">
          Stay organized. Get things done.
        </p>
      </div>
      <TodoList />
    </main>
  );
}
