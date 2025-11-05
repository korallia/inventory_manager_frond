import React, { useMemo, useState } from "react";
import { AddCategoryForm } from "../../forms/AddCategoryForm.jsx";
import { AddUnitForm } from "../../forms/AddUnitForm.jsx";
import { AddProductForm } from "../../forms/AddProductForm.jsx";
import Modal from "../../components/ui/Modal.jsx";

export const InventoryHeader = ({ products }) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [search, setSearch] = useState("");

  const { totalItems, totalValue } = useMemo(() => {
    const items = products?.length ?? 0;
    const value =
      (products || []).reduce((sum, p) => {
        const qty = Number(p?.available_quantity) || 0;
        const cost = Number(p?.individual_cost) || 0;
        return sum + qty * cost;
      }, 0) || 0;
    return { totalItems: items, totalValue: value };
  }, [products]);

  const formatCurrency = (num) =>
    new Intl.NumberFormat("fr-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);

  return (
    <>
      {/* Toolbar (unchanged) */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-md p-5 text-slate-100 w-full">
        <div className="flex flex-wrap items-center gap-3 md:gap-4 pb-4 border-b border-slate-700">
          <button
            className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-indigo-700 text-white font-medium shadow hover:bg-indigo-500 transition-colors text-sm whitespace-nowrap"
            onClick={() => setShowAddProduct(true)}
          >
            Ajouter un produit
          </button>

          <button
            className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-slate-700 text-slate-100 font-medium shadow hover:bg-slate-600 transition-colors text-sm whitespace-nowrap"
            onClick={() => setShowAddCategory(true)}
          >
            Ajouter une catégorie
          </button>

          <button
            className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-slate-700 text-slate-100 font-medium shadow hover:bg-slate-600 transition-colors text-sm whitespace-nowrap"
            onClick={() => setShowAddUnit(true)}
          >
            Ajouter une unité
          </button>

          <div className="flex flex-row flex-wrap items-center gap-3 md:ml-auto w-full md:w-auto">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="h-10 w-full md:w-72 px-3 rounded-md border border-slate-500 bg-slate-600 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="inline-flex items-center justify-center h-10 px-4 rounded-md border border-slate-500 bg-slate-600 text-slate-200 shadow-sm hover:bg-slate-600 hover:text-white transition-colors text-sm whitespace-nowrap"
              onClick={() => setSearch("")}
            >
              Réinitialiser
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 leading-relaxed text-slate-400">
          <span className="inline-flex items-center font-medium px-2 py-0.5 rounded-full bg-slate-700 text-slate-200 leading-none">
            {totalItems} items
          </span>

          <div>
            <span className="text-slate-300">Valeur totale estimée :</span>{" "}
            <span className="font-semibold text-slate-100">
              {formatCurrency(totalValue)}
            </span>
          </div>

          <div>
            <span className="text-slate-300">Dernière mise à jour :</span>{" "}
            <span className="font-semibold text-slate-100">aujourd’hui</span>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <Modal
        open={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        title="Nouvelle catégorie"
        maxWidth="28rem"
      >
        <AddCategoryForm onClose={() => setShowAddCategory(false)} />
      </Modal>

      <Modal
        open={showAddUnit}
        onClose={() => setShowAddUnit(false)}
        title="Nouvelle unité"
        maxWidth="36rem" // peut être un peu plus large si tu veux
      >
        <AddUnitForm onClose={() => setShowAddUnit(false)} />
      </Modal>

      <Modal
        open={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        title="Nouveau produit"
        maxWidth="40rem"
      >
        <AddProductForm onClose={() => setShowAddProduct(false)} />
      </Modal>
    </>
  );
};
