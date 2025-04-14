import React, { useState } from "react";
import {
  Mail,
  Youtube,
  Github,
  Globe,
  LinkIcon,
  Plus,
  Trash2,
  Pencil,
  Sun,
  Moon,
} from "lucide-react";

const detectService = (url) => {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("gmail.com") || lowerUrl.includes("mail.google.com")) {
    return { icon: <Mail className="text-red-500" />, name: "Gmail" };
  }
  if (lowerUrl.includes("yahoo.com")) {
    return { icon: <Mail className="text-purple-500" />, name: "Yahoo Mail" };
  }
  if (
    lowerUrl.includes("outlook.com") ||
    lowerUrl.includes("live.com") ||
    lowerUrl.includes("hotmail.com")
  ) {
    return { icon: <Mail className="text-blue-500" />, name: "Outlook Mail" };
  }
  if (lowerUrl.includes("youtube.com")) {
    return { icon: <Youtube className="text-red-600" />, name: "YouTube" };
  }
  if (lowerUrl.includes("github.com")) {
    return { icon: <Github className="text-gray-800" />, name: "GitHub" };
  }
  if (lowerUrl.includes("linkedin.com")) {
    return { icon: <LinkIcon className="text-blue-700" />, name: "LinkedIn" };
  }
  return { icon: <Globe className="text-blue-500" />, name: "Website" };
};

export default function ChameleonLinkPage() {
  const [input, setInput] = useState("");
  const [links, setLinks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [theme, setTheme] = useState("dark");

  const handleAddLink = () => {
    if (input.trim()) {
      if (editIndex !== null) {
        const updatedLinks = [...links];
        updatedLinks[editIndex] = input.trim();
        setLinks(updatedLinks);
        setEditIndex(null);
      } else {
        setLinks([...links, input.trim()]);
      }
      setInput("");
    }
  };

  const handleEdit = (index) => {
    setInput(links[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`min-h-screen px-4 py-8 sm:px-6 lg:px-8 transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#160A1D] to-[#2E2334] text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-2xl mx-auto text-center mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold">
            🌈 Chameleon Link Page
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>
        </div>
        <p className="text-base sm:text-lg text-gray-400 dark:text-gray-300">
          One page, all your important links with smart detection.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Paste your link here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 bg-white dark:bg-[#1C0F26] placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#EE2F5B]"
          />
          <button
            onClick={handleAddLink}
            className="bg-[#EE2F5B] hover:bg-[#d9284e] px-4 py-2 rounded flex items-center justify-center gap-1 text-white"
          >
            <Plus size={18} /> {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <div className="space-y-4 overflow-x-auto">
          {links.map((url, index) => {
            const { icon, name } = detectService(url);
            return (
              <div
                key={index}
                className="flex items-center gap-3 bg-[#f1f1f1] dark:bg-[#2E2334] hover:bg-gray-100 dark:hover:bg-[#3a2d44] px-4 py-3 rounded transition"
              >
                <div className="shrink-0">{icon}</div>
                <div className="flex-1 min-w-0">
                  <a
                    href={url.startsWith("http") ? url : `https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-semibold text-gray-900 dark:text-white hover:underline break-words"
                  >
                    {name}
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px] sm:max-w-[200px] md:max-w-[300px]">
                    {url}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-1 text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900 rounded"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400">
        Built with ❤️ by De creative
      </div>
    </div>
  );
}
