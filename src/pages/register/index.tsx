import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "../../app/globals.css";
import Tabs from "@/components/Tabs";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";

const registerTabs = [
  { name: "Salas", path: "/register/classrooms" },
  { name: "Classes", path: "/register/classes" },
  { name: "Membros", path: "/register/schoolMembers" },
  { name: "Disciplinas", path: "/register/subjects" },
];

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a1a] text-white">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="flex space-x-6 border-b border-gray-700">
            <Tabs tabs={registerTabs} />
          </div>
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Escolha um item para visualizar</p>
          </div>

          <FloatingButton onClick={() => console.log("Botão clicado!")}/>
        </main>


      </div>
        <Footer />
    </div>
  )

}