// src/components/ui/DeleteProductDialog.jsx
import React, { useState } from "react";

export function DeleteProductDialog({ product, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!product) return null;

  const handleDelete = async () => {
    setFailureMessage("");
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/products/${product.id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setSuccessMessage("Produit supprimé avec succès.");
        onDeleted && onDeleted();
        setTimeout(() => {
          setSuccessMessage("");
          onClose && onClose();
        }, 1000);
      } else {
        const err = await response.json().catch(() => ({}));
        setFailureMessage(err?.detail || "Erreur lors de la suppression.");
      }
    } catch {
      setFailureMessage("Une erreur réseau est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-200">
        Es-tu sûr de vouloir supprimer le produit{" "}
        <span className="font-semibold">{product.name}</span> ?
        <br />
        Cette action est irréversible.
      </p>

      {successMessage && (
        <div className="text-emerald-400 text-sm">{successMessage}</div>
      )}
      {failureMessage && (
        <div className="text-rose-400 text-sm">{failureMessage}</div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="h-10 px-4 rounded-md border border-slate-600 bg-slate-700
                     text-slate-200 hover:bg-slate-600 transition-colors text-sm"
        >
          Annuler
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="h-10 px-4 rounded-md bg-rose-600 text-white font-medium
                     hover:bg-rose-500 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
          {loading ? "Suppression..." : "Supprimer"}
        </button>
      </div>
    </div>
  );
}
