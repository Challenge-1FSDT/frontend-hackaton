import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSave?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-[400px]"
      >
        {/* Título do modal */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo do modal */}
        <div className="space-y-4">{children}</div>

        {/* Botão de ação */}
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onSave} 
            className="bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-700"
          >
            Salvar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
