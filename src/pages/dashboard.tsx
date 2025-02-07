import "../app/globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a1a] text-white">
      <Header /> 
      
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold text-indigo-400">Dashboard Principal</h2>
          <p className="mt-2 text-gray-300">Aqui ficará o conteúdo principal.</p>
        </main>
      </div>

      <Footer />
    </div>
  );
}
