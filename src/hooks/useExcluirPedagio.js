import { useState } from "react";
import api from "../api/api";

export default function useExcluirPedagio(carregarViagemTrecho) {
  const [excluindo, setExcluindo] = useState(false);

  const excluirPedagio = async (trechoId, pedagioId) => {
    const confirmar = window.confirm("Deseja realmente excluir este registro?");
    if (!confirmar) return false;

    try {
      setExcluindo(true);
      const response = await api.delete(`/excluir-pedagio/${trechoId}/${pedagioId}`);
      console.log("✅ Pedágio excluído:", response.data);
      alert("Registro excluído com sucesso!");
      if (typeof carregarViagemTrecho === "function") carregarViagemTrecho();
      return true;
    } catch (error) {
      console.error("❌ Erro ao excluir pedágio:", error);
      alert("Erro ao excluir o pedágio. Tente novamente.");
      return false;
    } finally {
      setExcluindo(false);
    }
  };

  return { excluirPedagio, excluindo };
}
