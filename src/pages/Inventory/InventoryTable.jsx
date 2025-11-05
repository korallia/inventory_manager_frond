import React, { useState } from "react";
import Modal from "../../components/ui/Modal.jsx";
import { EditProductForm } from "../../forms/EditProductForm.jsx";
import { DeleteProductDialog } from "../../components/ui/DeleteProductDialog.jsx";


export const InventoryTable = ({ products,onRefresh }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-md overflow-hidden text-slate-100">
      {/* header de la carte */}
      <div className="px-4 py-5  border-slate-500">
        <h2 className="text-lg font-medium text-white text-center">
          Inventaire actuel
        </h2>
      </div>

      {/* tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-base">
          <thead className="bg-slate-700   text-left text-slate-300 rounded-md ">
            <tr>
              <th className="px-4 py-3 font-medium">Nom du produit</th>
              <th className="px-4 py-3 font-medium">Catégorie</th>
              <th className="px-4 py-3 font-medium text-right">Quantité</th>
              <th className="px-4 py-3 font-medium">Unité</th>
              <th className="px-4 py-3 font-medium text-right">
                Coût indiv. ($)
              </th>
              <th className="px-4 py-3 font-medium text-right">
                Coût total ($)
              </th>
              <th className="px-4 py-3 font-medium text-right w-[130px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-500 text-slate-100">
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-sm text-slate-500"
                >
                  Aucun résultat.
                </td>
              </tr>
            )}

            {products.map((prod) => {
              const qty = Number(prod.available_quantity) || 0;
              const cost = Number(prod.individual_cost) || 0;
              const total = qty * cost;

              return (
                <tr
                  key={prod.id}
                  className="hover:bg-slate-700/40 transition-colors text-white"
                >
                  <td className="px-4 py-4 font-medium text-white">
                    {prod.name}
                  </td>

                  <td className="px-4 py-4 text-slate-300 text-white">
                    {prod.category_name}
                  </td>

                  <td className="px-4 py-4 text-right text-white tabular-nums">
                    {qty}
                  </td>

                  <td className="px-4 py-4 text-slate-300 text-white">
                    {prod.unit_abbreviation}
                  </td>

                  <td className="px-4 py-4 text-right text-slate-300 tabular-nums text-white">
                    {cost.toFixed(2)}
                  </td>

                  <td className="px-4 py-4 text-right text-white tabular-nums">
                    {total.toFixed(2)}
                  </td>

                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <div className="flex flex-col items-end space-y-2">
                      <button
                        className="
                          inline-flex items-center justify-center
                          px-8 py-2
                          text-sm font-semibold
                          text-white
                          bg-indigo-700
                          rounded-full
                          shadow
                          transition-colors
                          hover:bg-indigo-500
                        "
                         onClick={() => setEditingProduct(prod)}
                      >
                        Modifier
                      </button>

                      <button
                        className="
                          inline-flex items-center justify-center
                          px-6 py-2
                          text-sm font-semibold
                          text-white
                          bg-rose-700
                          rounded-full
                          shadow
                          transition-colors
                          hover:bg-rose-500
                        "
                        onClick={() => setDeletingProduct(prod)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
            <Modal
        open={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Modifier le produit"
        maxWidth="40rem"
      >
        {editingProduct && (
          <EditProductForm
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSaved={() => {
              onRefresh && onRefresh();
            }}
          />
        )}
      </Modal>
            <Modal
        open={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        title="Supprimer le produit"
        maxWidth="28rem"
      >
        {deletingProduct && (
          <DeleteProductDialog
            product={deletingProduct}
            onClose={() => setDeletingProduct(null)}
            onDeleted={() => {
              onRefresh && onRefresh();
            }}
          />
        )}
      </Modal>

    </div>
  );
};
