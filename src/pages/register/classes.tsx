import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "../../app/globals.css";
import Tabs from "@/components/Tabs";
import { useEffect, useState } from "react";
import DropdownMenu from "@/components/DropdownMenu";
import { useRouter } from "next/navigation";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ClassesService } from "@/services/ClassesService";
import AlertPopup from "@/components/AlertPopup";
import Modal from "@/components/Modal";

const classesTabs = [
  { name: "Salas", path: "/register/classrooms" },
  { name: "Classes", path: "/register/classes" },
  { name: "Membros", path: "/register/schoolMembers" },
  { name: "Disciplinas", path: "/register/subjects" },
];

export default function Classes() {
  const [classes, setClasses] = useState<{ id: string; name: string; startAt: string; endAt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "warning" | "info" } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const router = useRouter();

  const convertToISOString = (date: string) => {
    const dateObject = new Date(date);
    return dateObject.toISOString();
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleStartAt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartAt(convertToISOString(e.target.value));
  };

  const handleEndAt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndAt(convertToISOString(e.target.value));
  };

  useEffect(() => {
    ClassesService.getClasses()
      .then((data) => {
        const allClasses = data.data.map((cls: { id: string; name: string; startAt?: string; endAt?: string }) => ({
          ...cls,
          startAt: cls.startAt || "",
          endAt: cls.endAt || ""
        }));
        
        setClasses(allClasses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar classes:", error);
        setLoading(false);
      });
  }, []);

  const handleDeleteClass = (classId: string) => {
    ClassesService.deleteClass(classId)
      .then(() => {
        setClasses(classes.filter((classroom) => classroom.id !== classId));
        setAlert({ message: "Classe deletada com sucesso!", type: "success" });
      })
      .catch((error) => {
        console.error("Erro ao deletar classe:", error);
      });
  };

  const handleWithCreateClass = (name: string) => {
    ClassesService.createClass(name, startAt, endAt)
      .then(() => {
        setClasses([...classes, {
          name, startAt, endAt,
          id: ""
        }]);
        setAlert({ message: "Classe criada com sucesso!", type: "success" });
      })
      .catch((error) => {
        console.error("Erro ao criar classe:", error);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a1a] text-white">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="flex space-x-6 border-b border-gray-700">
            <Tabs tabs={classesTabs} />
          </div>
          <div className="pt-6 h-full">
            {loading ? (
              <p className="text-white text-center">Carregando...</p>
            ) : (
              <div className="space-y-4">
                {classes.map((clas) => (
                  <div key={clas.id} className="flex items-center justify-between bg-[#544B8F] p-4 rounded-md">
                    <Link 
                      href={`/register/classes/students`} 
                      key={clas.id} 
                      className="flex items-center justify-between w-full"
                      onClick={() => {
                        ClassesService.selectClassId(clas.id)
                        ClassesService.selectClassName(clas.name)
                      }}
                    >
                      <p>{clas.name}</p>
                    </Link>
                      <DropdownMenu
                        onEdit={() => router.push(`/register/classes/${clas.id}`)}
                        onDelete={() => {
                          handleDeleteClass(clas.id);
                        }}
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
            title="Criar Classe"
            onSave={() => {
              handleWithCreateClass(name);
              setIsModalOpen(false);
            }}
          >
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Nome:</label>
              <input 
                type="text" 
                className="w-full p-2 rounded bg-gray-700 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500" 
                placeholder="Digite o nome da aula..."
                onChange={handleName}
              />
            </div>
            <div className="flex space-x-2">
              <div className="w-1/2">
                <label className="text-sm font-medium">Início:</label>
                <input 
                  type="datetime-local" 
                  className="w-full p-2 rounded bg-gray-700 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={handleStartAt}
                />
              </div>
              <div className="w-1/2">
                <label className="text-sm font-medium">Fim:</label>
                <input 
                  type="datetime-local" 
                  className="w-full p-2 rounded bg-gray-700 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onChange={handleEndAt}
                />
              </div>
            </div>
            </div>
          </Modal>
        </main>
    </div>
    <Footer />
  </div>
  )
}