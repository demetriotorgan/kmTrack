import { useState } from "react";
import api from "../api/api";
import { dateToIso } from "../util/time";

export default function useSalvarPedagio(setNovoPedagio,carregarViagemTrecho) {
  const [salvando, setSalvando] = useState(false);

  const salvarPedagio = async (trechoId, novoPedagio) => {
    if (!trechoId) {
      alert("Selecione um trecho antes de salvar.");
      return;
    }

    const payload = {
      valor: novoPedagio.valor || "",
      local: novoPedagio.local || "",
      data: dateToIso(novoPedagio.data) || "",
    };

    console.log("💾 Salvando pedágio:", payload);
    console.log("Trecho alvo:", trechoId);

    const confirmar = window.confirm("Deseja realmente salvar este pedágio?");
    if (!confirmar) return false;

    try {
      setSalvando(true);
      const response = await api.post(`/salvar-pedagio/${trechoId}`, payload);
      console.log("✅ Resposta do servidor:", response.data);

      alert("Registro salvo com sucesso!");

      // Atualiza lista de viagens e trechos
      if (typeof carregarViagemTrecho === "function") {
        carregarViagemTrecho();
         setNovoPedagio({ valor: "", local: "", data: "" });
      }

      return true; // sucesso
    } catch (error) {
      console.error("❌ Erro ao salvar pedágio:", error);
      alert("Erro ao salvar pedágio. Verifique os dados e tente novamente.");
      return false;
    } finally {
      setSalvando(false);
    }
  };

  return { salvarPedagio, salvando };
}
