'use client';

import { useState } from 'react';
import type { Todo } from '@/types';
import TodoItem from '@/components/TodoItem';

type FilterType = 'all' | 'active' | 'completed';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = () => {
    const trimmed = inputValue.trim();
    if (trimmed.length === 0) return;

    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  const filterButtons: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="w-full max-w-lg">
      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="flex-1 rounded-lg border border-purple-500/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm text-gray-100 shadow-sm placeholder:text-purple-300/40 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
        />
        <button
          onClick={addTodo}
          disabled={inputValue.trim().length === 0}
          className="rounded-lg bg-gradient-to-r from-amber-500 to-pink-500 px-5 py-3 text-sm font-medium text-white shadow-sm transition-all hover:from-amber-400 hover:to-pink-400 hover:shadow-lg hover:shadow-pink-500/25 focus:outline-none focus:ring-2 focus:ring-amber-400/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {/* Filters */}
      {todos.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {filterButtons.map((fb) => (
              <button
                key={fb.value}
                onClick={() => setFilter(fb.value)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === fb.value
                    ? 'bg-gradient-to-r from-amber-500 to-pink-500 text-white'
                    : 'bg-white/10 text-purple-300/70 hover:bg-white/20 hover:text-purple-200'
                }`}
              >
                {fb.label}
              </button>
            ))}
          </div>
          <span className="text-xs text-purple-300/50">
            {activeCount} item{activeCount !== 1 ? 's' : ''} left
          </span>
        </div>
      )}

      {/* Todo list */}
      <ul className="mt-4 flex flex-col gap-2">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>

      {/* Empty states */}
      {todos.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="text-5xl">📝</div>
          <p className="mt-3 text-sm text-purple-300/50">
            No todos yet. Add one above to get started!
          </p>
        </div>
      )}

      {todos.length > 0 && filteredTodos.length === 0 && (
        <div className="mt-8 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-purple-300/50">
            No {filter === 'active' ? 'active' : 'completed'} todos.
          </p>
        </div>
      )}

      {/* Clear completed */}
      {completedCount > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearCompleted}
            className="text-xs text-purple-400/50 underline-offset-2 transition-colors hover:text-red-400 hover:underline"
          >
            Clear completed ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
}
