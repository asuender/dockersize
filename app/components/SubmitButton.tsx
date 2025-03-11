'use client';

import { useFormStatus } from 'react-dom';
import { Search } from 'lucide-react';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`flex items-center gap-1 px-3 rounded-md  ${
        pending
          ? 'bg-neutral-800 text-gray-400'
          : 'bg-black text-white dark:bg-white dark:text-black'
      }`}
      disabled={pending}
    >
      <Search size={16} /> <span>Search</span>
    </button>
  );
}
