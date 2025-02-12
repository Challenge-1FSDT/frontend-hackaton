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

const registerTabs = [
  { name: "Salas", path: "/register/classrooms" },
  { name: "Classes", path: "/register/classes" },
  { name: "Membros", path: "/register/schoolMembers" },
  { name: "Disciplinas", path: "/register/subjects" },
];

export default function Classes() {
  const [classes, setClasses] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    ClassesService.getClasses()
      .then((data) => {
        const allClasses = data.data;
        
        setClasses(allClasses);
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
          {/* list classes */}
          <div className="pt-6 h-full">
            {loading ? (
              <p className="text-white text-center">Carregando...</p>
            ) : (
              <div className="space-y-4">
                {classes.map((classroom) => (
                  <div key={classroom.id} className="flex items-center justify-between bg-[#544B8F] p-4 rounded-md">
                    <Link 
                      href={`/register/classes/students`} 
                      key={classroom.id} 
                      className="flex items-center justify-between w-full"
                      onClick={() => ClassesService.selectClassId(classroom.id)}
                    >
                      <p>{classroom.name}</p>
                      <DropdownMenu
                        onEdit={() => router.push(`/register/classes/${classroom.id}`)}
                        onDelete={() => console.log("Deletar classe")}
                      />
                    </Link>
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
  )

}