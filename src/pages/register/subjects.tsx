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
import Modal from "@/components/Modal";
import AlertPopup from "@/components/AlertPopup";

const registerTabs = [
  { name: "Salas", path: "/register/classrooms" },
  { name: "Classes", path: "/register/classes" },
  { name: "Membros", path: "/register/schoolMembers" },
  { name: "Disciplinas", path: "/register/subjects" },
];

export default function Subjects() {
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "warning" | "info" } | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }
  
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

  const handleWithDeletedSubject = (id: string) => {
    SubjectService.deleteSubject(id)
      .then(() => {
        setSubjects(subjects.filter((subject) => subject.id !== id));
        setAlert({ message: "Disciplina deletada com sucesso!", type: "success" });
      })
      .catch(() => {
        setAlert({ message: "Erro ao deletar disciplina!", type: "error" });
      });
  }

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
                      onDelete={() => handleWithDeletedSubject(subject.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <FloatingButton onClick={() => {setIsModalOpen(true)}}/>
          {alert && (
            <AlertPopup 
              message={alert.message} 
              type={alert.type} 
              onClose={() => setAlert(null)}
            />
          )}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Criar Disciplina"
            onSave={() => {
              SubjectService.createSubject(name, description)
                .then(() => {
                  setSubjects([...subjects, { id: "", name }]);
                  setAlert({ message: "Disciplina criada com sucesso!", type: "success" });
                  setIsModalOpen(false);
                })
                .catch(() => {
                  setAlert({ message: "Erro ao criar disciplina!", type: "error" });
                  setIsModalOpen(false);
                });
            }}
          >
            <div>
              <label className="text-sm font-medium">Nome da Disciplina:</label>
              <input
                type="text"
                placeholder="Digite um nome para a disciplina..."
                className="w-full p-2 border bg-gray-700 border-gray-700 rounded-md"
                onChange={handleName}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Descrição:</label>
              <input 
                type="text" 
                className="w-full p-2 rounded bg-gray-700 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                placeholder="Digite uma descrição."
                onChange={handleDescription}
              />
            </div>
          </Modal>
        </main>
      </div>

      <Footer />
    </div>
  );
}
