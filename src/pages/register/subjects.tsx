'use client';

import "../../app/globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Tabs from "@/components/Tabs";
import DropdownMenu from "@/components/DropdownMenu";
import FloatingButton from "@/components/FloatingButton";
import { SubjectService } from "@/services/SubjectService";
import { AuthService } from "@/services/AuthService";

const registerTabs = [
  { name: "Salas", path: "/register/classrooms" },
  { name: "Classes", path: "/register/classes" },
  { name: "Membros", path: "/register/schoolMembers" },
  { name: "Disciplinas", path: "/register/subjects" },
];

export default function Subjects() {
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      router.push("/");
      return;
    }

    SubjectService.getSubjects()
      .then((data) => {
        const allSubjects = data.data;
        setSubjects(allSubjects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar disciplinas:", error);
        setLoading(false);
      });
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a1a] text-white">
      <Header /> 
      
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex space-x-6 border-b border-gray-700">
            <Tabs tabs={registerTabs} />
          </div>
          {/* list subjects */}
          <div className="pt-6 h-full">
            {loading ? (
              <p className="text-white text-center">Carregando...</p>
            ) : (
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="flex items-center justify-between bg-[#544B8F] p-4 rounded-md">
                    <p>{subject.name}</p>
                    <DropdownMenu
                      onEdit={() => router.push(`/register/classes/${subject.id}`)}
                      onDelete={() => console.log("Deletar disciplina")}
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
