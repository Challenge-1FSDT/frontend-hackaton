// based on selectedClass and selectedSchool

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../app/globals.css";
import Tabs from "@/components/Tabs";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import DropdownMenu from "@/components/DropdownMenu";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ClassesService } from "@/services/ClassesService";

const studentsTabs = [
  { name: "Alunos", path: "/register/classes/students" },
  { name: "Aulas", path: "/register/classes/lectures" },
];

export default function Students() {
  const [students, setStudents] = useState<{ id: string; name: string; role: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    ClassesService.getStudents()
      .then((data) => {
        const allStudents = data.data;
        setStudents(allStudents);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar alunos:", error);
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
            <Tabs tabs={studentsTabs} />
          </div>
          <h1 className="text-2xl font-semibold mt-6 text-white">{localStorage.getItem('selectedClassName')}</h1>
          <div className="pt-6 h-full">
            {loading ? (
              <p className="text-white text-center">Carregando...</p>
            ) : (
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between bg-[#544B8F] p-4 rounded-md">
                      <p>{student.role}</p>
                      <DropdownMenu
                        onEdit={() => router.push(`/register/classes/${student.id}`)}
                        onDelete={() => console.log("Deletar aluno")}
                      />
                  </div>
                ))}               
              </div>
            )}
          </div>

          <FloatingButton onClick={() => console.log("Botão clicado!")}/>

        </main>
      </div>
      <Footer />
    </div>
  );
        
}