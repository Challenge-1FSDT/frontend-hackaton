"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

interface FloatingButtonProps {
  onClick?: () => void;
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={onClick || (() => router.push("/register/new"))}
      className="fixed bottom-12 right-6 bg-white text-indigo-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gray-100 transition"
    >
      <Plus size={24} />
    </button>
  );
}
