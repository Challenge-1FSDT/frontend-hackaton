'use client';

import "../app/globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/AuthService";
import FloatingButton from "@/components/FloatingButton";
import { LecturesService } from "@/services/LectureService";

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

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a1a] text-white">
      <Header /> 
      
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex space-x-6 border-b border-gray-700">
          </div>
          <div className="pt-6 h-full">
            {loading ? (
              <p className="text-white text-center">Carregando...</p>
            ) : (
              lectures.map((lecture) => (
                <div key={lecture.id} className="mt-2 bg-[#544B8F] p-4 rounded-md text-white">
                  <p>{lecture.name}</p>
                  <p>Início: {formatDate(lecture.startAt)}</p>
                  <p>Fim: {formatDate(lecture.endAt)}</p>
                </div>
              ))
            )}
          </div>
          <FloatingButton onClick={() => console.log("Botão clicado!")}/>
        </main>
      </div>

      <Footer />
    </div>
  );
}
