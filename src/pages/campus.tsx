'use client';

import "../app/globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/AuthService";
import { CampusService } from "@/services/CampusService";

export default function Campus () {
  const [campus, setCampus] = useState<{ id: string; name: string; fantasyName: string; address: string; city: string; state: string; taxId: string; }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      router.push("/");
      return;
    }
    
    CampusService.getCampus()
      .then((data) => {
        const allCampus = Array.isArray(data) ? data : [data];
        setLoading(false);
        setCampus(allCampus);
      })
      .catch((error) => {
        console.error('Erro ao buscar campus:', error);
      });
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a1a] text-white">
      <Header />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold text-indigo-400">Campus</h2>

          <ul className="mt-4 space-y-4">
            {loading && (
              <p className="text-white text-center">Carregando...</p>
            )}

            {!loading && campus.map((campus) => (
              <li key={campus.id} className="bg-[#12122b] p-4 rounded-md">
                <p className="text-white font-semibold">{campus.name}</p>
                <p className="text-gray-400">{campus.fantasyName}</p>
                <p className="text-gray-400">{campus.taxId}</p>
                <p className="text-gray-400">{campus.address}</p>
                <p className="text-gray-400">{campus.city} - {campus.state}</p>
              </li>
            ))}
            
            {!loading && campus.length === 0 && (
              <p className="text-white text-center">Nenhum campus encontrado.</p>
            )}
          </ul>
        </main>
      </div>

      <Footer />
    </div>
  );
}

