import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface AlertPopupProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

const alertStyles: Record<string, string> = {
  success: "bg-green-600 border-green-400 text-white",
  error: "bg-red-600 border-red-400 text-white",
  warning: "bg-yellow-600 border-yellow-400 text-black",
  info: "bg-blue-600 border-blue-400 text-white",
};

const AlertPopup: React.FC<AlertPopupProps> = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border shadow-lg ${alertStyles[type]}`}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold">{message}</span>
        <button onClick={onClose} className="ml-4 text-white font-bold">×</button>
      </div>
    </motion.div>
  );
};

export default AlertPopup;
