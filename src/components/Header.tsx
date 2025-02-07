import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-[#0b0b20] p-4 border-b border-indigo-500">
      <Link href="/">
        <h1 className="text-xl font-bold">
          <span className="text-white">LEARN</span>
          <span className="text-indigo-500">ON</span>
        </h1>
      </Link>
        <nav className="flex items-center space-x-6">
          <Image
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border-2 border-indigo-500"
          />
        </nav>
      </header>
  );
};