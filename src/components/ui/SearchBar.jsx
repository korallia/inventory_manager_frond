import React from "react";

/**
 * SearchBar simple contrôlée en local
 * Appelle onQueryChange(query) à chaque frappe
 */
export const SearchBar = ({
  onQueryChange = () => {},
  placeholder = "Rechercher un produit...",
  className = "",
}) => {
  const [query, setQuery] = React.useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onQueryChange(value); // ← IMPORTANT : appelle la fonction du parent
  };

  const clear = () => {
    setQuery("");
    onQueryChange(""); // ← réinitialise dans le parent aussi
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="h-10 w-full md:w-72 px-3 rounded-md border border-slate-500 bg-slate-600 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        value={query}
        onChange={handleChange}
      />
      {query ? (
        <button
          className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-slate-500 bg-slate-600 text-slate-200 shadow-sm hover:bg-slate-600 transition-colors text-sm"
          onClick={clear}
        >
          Réinitialiser
        </button>
      ) : null}
    </div>
  );
};
