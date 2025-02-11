import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AuthService } from "@/services/AuthService";
import { SubjectService } from "@/services/SubjectService";

export default function Subject() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      router.push("/");
      return;
    }

    const selectedSubject = localStorage.getItem("selectedSubject");
    if (!selectedSubject) {
      router.push("/subjects");
      return;
    }

    SubjectService.getSubject(selectedSubject)
      .then((data) => {
        const allSubjects = { ...data };
        setSubject(allSubjects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar disciplina:", error);
        setLoading(false);
      });
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a1a] text-white">
      <Header /> 
      
      <div className="flex flex-1">
        <Sidebar />
        {!loading && (
          <main className="flex-1 p-6">
            <h2 className="text-xl font-semibold text-indigo-400">{subject?.name}</h2>
            <p className="mt-2 text-gray-300">Aqui ficará o conteúdo da matéria.</p>
          </main>
        )}
      </div>

      <Footer />
    </div>
  );
}
