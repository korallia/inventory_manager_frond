// src/forms/EditProductForm.jsx
import React, { useEffect, useState } from "react";

export function EditProductForm({ product, onClose, onSaved }) {
  const [name, setName] = useState(product?.name || "");
  const [quantity, setQuantity] = useState(product?.available_quantity ?? "");
  const [cost, setCost] = useState(product?.individual_cost ?? "");

  // les select travaillent mieux avec des string
  const [categoryId, setCategoryId] = useState("");
  const [unitId, setUnitId] = useState("");

  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 1) charger catégories + unités UNE fois
  useEffect(() => {
    fetch("http://localhost:8000/categories/")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});

    fetch("http://localhost:8000/units/")
      .then((r) => r.json())
      .then(setUnits)
      .catch(() => {});
  }, []);

  // 2) dès que le produit OU les listes changent → tout resynchroniser
  useEffect(() => {
    if (!product) return; // rien à faire si pas de produit encore

    // champs simples
    setName(product.name || "");
    setQuantity(product.available_quantity ?? "");
    setCost(product.individual_cost ?? "");

    // ---------- Catégorie ----------
    let catId = product.category_id;

    // si l'API ne renvoie pas l'id mais seulement category_name
    if ((catId == null || catId === "") && product.category_name && categories.length > 0) {
      const found = categories.find((c) => c.name === product.category_name);
      if (found) catId = found.id;
    }

    setCategoryId(catId != null ? String(catId) : "");

    // ---------- Unité ----------
    let uId = product.unit_id;

    // si l'API ne renvoie pas l'id mais seulement unit_abbreviation
    if ((uId == null || uId === "") && product.unit_abbreviation && units.length > 0) {
      const found = units.find(
        (u) =>
          u.abbreviation === product.unit_abbreviation ||
          u.name === product.unit_abbreviation
      );
      if (found) uId = found.id;
    }

    setUnitId(uId != null ? String(uId) : "");
  }, [product, categories, units]); // <= ICI tu as bien categories dans ce useEffect

  const handleSubmit = async () => {
    if (!name.trim() || !quantity || !cost || !categoryId || !unitId) {
      return setFailureMessage("Tous les champs sont requis.");
    }

    setFailureMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/products/${product.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            available_quantity: Number(quantity),
            individual_cost: Number(cost),
            category_id: Number(categoryId),
            unit_id: Number(unitId),
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Produit modifié avec succès !");
        onSaved && onSaved();
        setTimeout(() => {
          setSuccessMessage("");
          onClose && onClose();
        }, 1200);
      } else {
        const err = await response.json().catch(() => ({}));
        setFailureMessage(err?.detail || "Erreur lors de la modification.");
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
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-300">
            Nom du produit
          </label>
          <input
            className="mt-1 w-full h-10 px-3 rounded-md border border-slate-600 bg-slate-700
                       text-slate-100 placeholder-slate-400 focus:outline-none
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex. Résine A"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">
            Quantité
          </label>
          <input
            type="number"
            min="0"
            step="1"
            className="mt-1 w-full h-10 px-3 rounded-md border border-slate-600 bg-slate-700
                       text-slate-100 placeholder-slate-400 focus:outline-none
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">
            Coût unitaire
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="mt-1 w-full h-10 px-3 rounded-md border border-slate-600 bg-slate-700
                       text-slate-100 placeholder-slate-400 focus:outline-none
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">
            Catégorie
          </label>
          <select
            className="mt-1 w-full h-10 px-3 rounded-md border border-slate-600 bg-slate-700
                       text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Sélectionner</option>
            {categories.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">
            Unité
          </label>
          <select
            className="mt-1 w-full h-10 px-3 rounded-md border border-slate-600 bg-slate-700
                       text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500
                       focus:border-indigo-500"
            value={unitId}
            onChange={(e) => setUnitId(e.target.value)}
          >
            <option value="">Sélectionner</option>
            {units.map((u) => (
              <option key={u.id} value={String(u.id)}>
                {u.name}
              </option>
            ))}
          </select>
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
          {loading ? "Sauvegarde..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
