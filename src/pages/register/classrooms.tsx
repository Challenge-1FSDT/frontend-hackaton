import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "../../app/globals.css";
import Tabs from "@/components/Tabs";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import DropdownMenu from "@/components/DropdownMenu";
import { useRouter } from "next/navigation";
import { ClassroomsService } from "@/services/ClassroomsService";

const classroomsTabs = [
  { name: "Salas", path: "/register/classrooms" },
  { name: "Classes", path: "/register/classes" },
  { name: "Membros", path: "/register/schoolMembers" },
  { name: "Disciplinas", path: "/register/subjects" },
];

export default function Classrooms() {
  const [classrooms, setClassrooms] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  console.log(classrooms);

  useEffect(() => {
    ClassroomsService.getClassrooms()
      .then((data) => {
        const allClassrooms = data.data;
        
        setClassrooms(allClassrooms);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar salas:", error);
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
            <Tabs tabs={classroomsTabs} />
          </div>
          {/* list classrooms */}
          <div className="pt-6 h-full">
            {loading ? (
              <p className="text-white text-center">Carregando...</p>
            ) : (
              <div className="space-y-4">
                {classrooms.map((classroom: { id: string; name: string }) => (
                  <div key={classroom.id} className="flex items-center justify-between bg-[#544B8F] p-4 rounded-md">
                    <p>{classroom.name}</p>
                    <DropdownMenu
                        onEdit={() => router.push(`/register/classes/${classroom.id}`)}
                        onDelete={() => {
                          ClassroomsService.deleteClassroom(classroom.id);
                          setClassrooms(classrooms.filter((c) => c.id !== classroom.id));
                        }}
                      />
                  </div>
                ))}
              </div>
            )}
          </div>

          <FloatingButton onClick={() => {
            const classroomName = prompt("Digite o nome da sala");
            if (classroomName) {
              ClassroomsService.createClassroom(classroomName);
              setClassrooms([...classrooms, { id: "new", name: classroomName }]);
            }
          }}/>

        </main>


      </div>
        <Footer />
    </div>
  )

}