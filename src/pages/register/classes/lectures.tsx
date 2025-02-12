'use client';

import "../../../app/globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/AuthService";
import Tabs from "@/components/Tabs";
import FloatingButton from "@/components/FloatingButton";
import Schedule from "@/components/Schedule";
import { LecturesService } from "@/services/LectureService";

const registerTabs = [
  { name: "Alunos", path: "/register/classes/students" },
  { name: "Aulas", path: "/register/classes/lectures" },
];

export default function Subjects() {
  const [lectures, setLectures] = useState<{ id: string; name: string; startAt: string; endAt: string; }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      router.push("/");
      return;
    }

    LecturesService.getLectures()
      .then((data) => {
        const AllLectures = data.data;
        setLectures(AllLectures);
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
          {/* lecture name */}
          <div className="pt-6 h-full">
            {loading ? (
              <p className="text-white text-center">Carregando...</p>
            ) : (
              <Schedule lectures={lectures} />
            )}
          </div>
          <FloatingButton onClick={() => console.log("Botão clicado!")}/>
        </main>
      </div>

      <Footer />
    </div>
  );
}
