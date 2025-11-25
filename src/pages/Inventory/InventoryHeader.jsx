import React, { useMemo, useState } from "react";
import { AddCategoryForm } from "../../forms/AddCategoryForm.jsx";
import { AddUnitForm } from "../../forms/AddUnitForm.jsx";
import { AddProductForm } from "../../forms/AddProductForm.jsx";
import Modal from "../../components/ui/Modal.jsx";

export const InventoryHeader = ({ products }) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddUnit, setShowAddUnit] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

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

  const itemsLabel = totalItems === 1 ? "item" : "items";

  return (
    <>
      <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-md text-slate-100 w-full mb-6">
        {/* Conteneur interne aligné avec l'inventaire */}
        <div className="max-w-5xl mx-auto px-6 py-5 space-y-4">
          {/* LIGNE 1 : Organisation / Utilisateur */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm text-slate-400">Organisation</div>
              <div className="text-lg font-semibold text-white">
                Panassor Inc.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 justify-start md:justify-end">
              <div className="text-sm text-slate-400">
                Connecté en tant que
              </div>
              <div className="text-white font-semibold">
                Korallia Frenette
              </div>
              <button
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-700 text-white text-sm font-medium hover:bg-slate-600 transition"
                onClick={() => setShowSettings(true)}
              >
                <span className="text-lg">⚙</span> Paramètres
              </button>
            </div>
          </div>

          {/* LIGNE 2 : Boutons à gauche / résumé à droite, sur UNE seule ligne (en desktop) */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Boutons d'action */}
            <div className="flex flex-wrap gap-3">
              {/* Action principale */}
              <button
                className="px-4 py-2 rounded-md bg-indigo-700 text-white font-medium hover:bg-indigo-500 text-sm"
                onClick={() => setShowAddProduct(true)}
              >
                Ajouter un produit
              </button>

              {/* Actions secondaires */}
              <button
                className="px-4 py-2 rounded-md border border-slate-600 bg-transparent text-slate-200 font-medium hover:bg-slate-700 text-sm"
                onClick={() => setShowAddCategory(true)}
              >
                Gérer les catégories
              </button>
              <button
                className="px-4 py-2 rounded-md border border-slate-600 bg-transparent text-slate-200 font-medium hover:bg-slate-700 text-sm"
                onClick={() => setShowAddUnit(true)}
              >
                Gérer les unités
              </button>
            </div>

            {/* Résumé inventaire : à droite */}
            <div className="flex flex-wrap items-center gap-4 md:justify-end text-slate-300 text-sm">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-slate-700 text-white text-xs font-semibold">
                  {totalItems} {itemsLabel}
                </span>
              </div>

              <div>
                Dernière mise à jour :{" "}
                <span className="text-white font-semibold">aujourd’hui</span>
              </div>

              <div>
                Valeur totale estimée :{" "}
                <span className="text-white font-semibold">
                  {formatCurrency(totalValue)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <Modal
        open={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        title="Gestion des catégories"
        maxWidth="28rem"
      >
        <AddCategoryForm onClose={() => setShowAddCategory(false)} />
      </Modal>

      <Modal
        open={showAddUnit}
        onClose={() => setShowAddUnit(false)}
        title="Gestion des unités"
        maxWidth="36rem"
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
