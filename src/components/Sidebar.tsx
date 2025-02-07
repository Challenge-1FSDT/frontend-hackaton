'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Home' },
    { href: '/register', label: 'Cadastro' },
    { href: '/subjects', label: 'Aulas' },
    { href: '/campus', label: 'Campus' },
  ];

  return (
    <aside className="w-1/5 bg-[#0c0c24] border-r border-indigo-500 p-4">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={`block p-2 ${pathname === item.href ? 'bg-indigo-500' : ''}`}>
                {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};