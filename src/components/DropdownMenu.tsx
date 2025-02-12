// components/DropdownMenu.tsx
import React, { useState } from 'react';

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsOpen(false);
    onEdit();
  }

  const handleDelete = () => {
    setIsOpen(false);
    onDelete();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-200 hover:text-gray-200 focus:outline-none"
      >
        &#8942;
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={handleEdit}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Deletar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;