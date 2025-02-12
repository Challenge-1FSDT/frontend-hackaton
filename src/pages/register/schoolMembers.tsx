import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "../../app/globals.css";
import Tabs from "@/components/Tabs";
import { useEffect, useState } from "react";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import { SchoolMembersService } from "@/services/SchoolMembersService";

const registerTabs = [
  { name: "Salas", path: "/register/classrooms" },
  { name: "Classes", path: "/register/classes" },
  { name: "Membros", path: "/register/schoolMembers" },
  { name: "Disciplinas", path: "/register/subjects" },
];

export default function SchoolMembers() {
  const [schoolMembers, setSchoolMembers] = useState<{ id: string; firstName: string; role: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const roleNames: Record<string, string> = {
    TEACHER: "Professor",
    STUDENT: "Aluno",
    ADMIN: "Administrador",
  };

  useEffect(() => {
    SchoolMembersService.getSchoolMembers()
      .then((data) => {
        const allSchoolMembers = data.data;

        setSchoolMembers(allSchoolMembers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar classes:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a1a] text-white">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="flex space-x-6 border-b border-gray-700">
            <Tabs tabs={registerTabs} />
          </div>
          {/* list school members */}
          <div className="pt-6 h-full">
            {loading ? (
              <p className="text-white text-center">Carregando...</p>
            ) : (
              <div className="space-y-4">
                <table className="w-full border-collapse border border-gray-700">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="border border-gray-700 px-4 py-2 text-left">Nome</th>
                      <th className="border border-gray-700 px-4 py-2 text-left">Função</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schoolMembers.map((member, index) => (
                      <tr key={index} className="border border-gray-700">
                        <td className="border border-gray-700 px-4 py-2">{member.firstName}</td>
                        <td className="border border-gray-700 px-4 py-2">{roleNames[member.role]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <FloatingButton onClick={() => console.log("Botão clicado!")}/>
        </main>


      </div>
        <Footer />
    </div>
  )

}