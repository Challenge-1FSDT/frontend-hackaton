"use client";

import { usePathname, useRouter } from "next/navigation";

interface Tab {
  name: string;
  path: string;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center space-x-2 border-b border-gray-700">
      <div className="flex space-x-2 flex-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`px-6 py-2 rounded-t-lg text-white transition-colors
                ${isActive ? "bg-indigo-500 text-white font-semibold" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}
              `}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
      <div className="px-2 py-1 rounded-t-lg bg-gray-800 text-gray-400">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="px-2 py-1 rounded-t-lg bg-gray-800 text-gray-400"
        />
      </div>
    </div>
  );
}
