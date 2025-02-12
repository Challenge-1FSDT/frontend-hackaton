import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { AuthService } from "@/services/AuthService";
import "../app/globals.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await AuthService.login(email, password);

      if (response) {
        setError(response);
        return;
      }

      router.push("/schools");
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      setError("Falha ao autenticar");
    }
    
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center h-screen bg-[#0a0a1a] text-white"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#12122b] p-8 rounded-lg shadow-lg w-80 text-center"
      >
        <h1 className="text-2xl font-bold text-white mb-6">Learn<span className="text-[#5340C6]">ON</span></h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md bg-[#2a2a5e] text-white focus:outline-none"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md bg-[#2a2a5e] text-white focus:outline-none"
            required
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="px-4 py-3 bg-[#544B8F] hover:bg-[#5340C6] transition rounded-md"
          >
            Entrar
          </motion.button>
        </form>

        <p className="text-gray-500 text-sm mt-4">© LearnOn 2025</p>
      </motion.div>
    </motion.div>
  );
}
