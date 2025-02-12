import React, { useState } from "react";
import { Search } from "lucide-react";
import { SubjectService } from "../services/SubjectService";

interface SearchInputProps {
  placeholder?: string;
  onSelect: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Buscar...", onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (searchTerm: string) => {
    setLoading(true);
    try {
      SubjectService.getSubjects(searchTerm)
        .then((data: { data: { id: string; name: string }[] }) => {
          setResults(data.data.map((subject) => subject.name));
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
          setResults([]);
        });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setResults([]);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      fetchResults(value);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none placeholder-gray-300"
        />
        <Search size={18} className="text-gray-300" />
      </div>

      {results.length > 0 && (
        <ul className="absolute left-0 w-full bg-gray-900 text-white rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto">
          {results.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
              onClick={() => {
                onSelect(item);
                setQuery(item);
                setResults([]);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {loading && <p className="text-gray-400 text-sm mt-1">Carregando...</p>}
    </div>
  );
};

export default SearchInput;
