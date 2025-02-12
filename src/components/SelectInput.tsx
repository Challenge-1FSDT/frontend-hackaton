import React, { useState } from "react";
import { Search } from "lucide-react";

interface SelectInputProps {
  options: string[];
  onSelect: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Input de seleção */}
      <div
        className="flex items-center justify-between bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-1 ml-2">{selected || "Buscar sala..."}</span>
        <Search size={18} className="text-gray-300" />
      </div>

      {isOpen && (
        <ul className="absolute left-0 w-full bg-gray-900 text-white rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectInput;
