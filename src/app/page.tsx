'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0a0a1a] text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Learn<span className="text-[#5340C6]">ON</span></h1>
        <p className="text-lg text-gray-300 max-w-md">
          Conectando você à sua escola de forma simples e eficiente.
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/login")}
        className="mt-6 px-6 py-3 bg-[#544B8F] hover:bg-[#5340C6] transition rounded-lg text-lg"
      >
        Acessar
      </motion.button>

      <p className="absolute bottom-4 text-gray-500 text-sm">
        © LearnOn 2025 - Todos os direitos reservados.
      </p>
    </div>
  );
}
