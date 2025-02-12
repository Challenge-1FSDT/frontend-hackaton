import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-[#0b0b20] p-4 border-b border-indigo-500">
      <Link href="/">
        <h1 className="text-xl font-bold">
          <span className="text-white">LEARN</span>
          <span className="text-indigo-500">ON</span>
        </h1>
      </Link>
      </header>
  );
};