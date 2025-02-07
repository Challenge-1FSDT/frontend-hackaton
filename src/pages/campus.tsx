'use client';

import "../app/globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import * as api from '../services/api';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

export default function Campus () {
  const [campus, setCampus] = useState<{ id: string; name: string; fantasyName: string; address: string; city: string; state: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!api.AuthService.isAuthenticated()) {
      router.push("/");
      return;
    }
    
    api.CampusService.getCampus()
      .then((data) => {
        const allCampus = { ...data };
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
          <p className="mt-2 text-gray-300">Aqui ficará a lista de campus.</p>

          <ul className="mt-4 space-y-4">
            {campus.map((item: { id: string; name: string; fantasyName: string; address: string; city: string; state: string }) => (
              <li key={item.id} className="bg-[#0c0c24] p-4 rounded-md">
                <h3 className="text-lg font-semibold text-indigo-400">{item.name}</h3>
                <p className="mt-2 text-gray-300">{item.fantasyName}</p>
                <p className="mt-2 text-gray-300">{item.address}, {item.city} - {item.state}</p>
              </li>
            ))}
          </ul>
        </main>
      </div>

      <Footer />
    </div>
  );
}

