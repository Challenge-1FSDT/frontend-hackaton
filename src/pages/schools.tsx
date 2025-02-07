import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaGraduationCap } from "react-icons/fa";
import * as api from "../services/api";
import "../app/globals.css";

export default function Schools() {
  const [schools, setSchools] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!api.AuthService.isAuthenticated()) {
      router.push("/");
      return;
    }

    api.SchoolService.getSchools()
      .then((data) => {        
        const allSchools = data.data;
        
        setSchools(allSchools);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar escolas:", error);
        setLoading(false);
      });
  }, [router]);

  const handleSelectSchool = (schoolId: string) => {
    localStorage.setItem("selectedSchool", schoolId);
    router.push("/dashboard"); 
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0a0a1a]">
      <div className="w-full max-w-lg p-8 bg-[#0a0a1a] rounded-lg">
        <h1 className="text-white text-2xl font-bold mb-6 flex items-center">
          <FaGraduationCap className="text-purple-400 mr-2" /> Escolas
        </h1>

        {loading ? (
          <p className="text-white text-center">Carregando...</p>
        ) : (
          <div className="space-y-4">
            {schools.map((school) => (
              <button
                key={school.id}
                onClick={() => handleSelectSchool(school.id)}
                className="w-full p-4 bg-[#12122b] rounded-md text-left focus:outline-none"
              >
                {school.name}
              </button>
            ))}
          </div>
        )}

        <p className="text-center text-sm text-gray-400 mt-6">
          © LearnOn 2025
        </p>
      </div>
    </div>
  );
}
