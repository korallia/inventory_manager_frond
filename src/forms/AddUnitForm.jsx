import React, { useState } from "react";

export function AddUnitForm({ onClose }) {
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!symbol.trim() || !name.trim())
      return setFailureMessage("Symbole et nom sont requis.");
    setFailureMessage(""); setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/units/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), abbreviation: symbol.trim() }),
      });
      if (response.ok) {
        setSuccessMessage("Unité ajoutée avec succès !");
        setTimeout(() => { setSuccessMessage(""); onClose?.(); }, 1200);
      } else {
        const err = await response.json().catch(() => ({}));
        setFailureMessage(err?.detail || "Erreur lors de l’ajout.");
      }
    } catch {
      setFailureMessage("Une erreur réseau est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Symbole de l’unité
          </label>
          <input
            className="mt-1 w-full h-10 px-3 rounded-md border border-slate-600 bg-slate-700
                       text-slate-100 placeholder-slate-400 focus:outline-none
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Ex. L, g, mL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Nom de l’unité
          </label>
          <input
            className="mt-1 w-full h-10 px-3 rounded-md border border-slate-600 bg-slate-700
                       text-slate-100 placeholder-slate-400 focus:outline-none
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex. Litre"
          />
        </div>
      </div>

      {successMessage && (
        <div className="text-emerald-400 text-sm">{successMessage}</div>
      )}
      {failureMessage && (
        <div className="text-rose-400 text-sm">{failureMessage}</div>
      )}

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="h-10 px-4 rounded-md border border-slate-600 bg-slate-700
                     text-slate-200 hover:bg-slate-600 transition-colors"
        >
          Annuler
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="h-10 px-4 rounded-md bg-indigo-600 text-white font-medium
                     hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Ajout..." : "Ajouter"}
        </button>
      </div>
    </form>
  );
}
