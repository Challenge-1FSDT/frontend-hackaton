'use client';

import "../app/globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as api from "../services/api";

export default function Subjects() {
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    if (!api.AuthService.isAuthenticated()) {
      router.push("/");
      return;
    }

    api.SubjectService.getSubjects()
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

  const handleSelectSubject = (subjectId: string) => {
    localStorage.setItem("selectedSubject", subjectId);
    router.push("/subject");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a1a] text-white">
      <Header /> 
      
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold text-indigo-400">Matérias</h2>
          {/* disciplinas */}
          {loading ? (
            <p className="text-white text-center">Carregando...</p>
          ) : (
            <div className="space-y-4 mt-6">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => handleSelectSubject(subject.id)}
                  className="w-full p-4 bg-[#12122b] rounded-md text-left focus:outline-none"
                >
                  {subject.name}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
