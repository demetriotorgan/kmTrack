// src/hooks/useExcluirAbastecimento.js
import { useState } from "react";
import api from "../api/api";

export default function useExcluirAbastecimento(carregarViagemTrecho) {
  const [excluindo, setExcluindo] = useState(false);

  const excluirAbastecimento = async (trechoId, abastecimentoId) => {
    try {
      const confirmar = window.confirm("Deseja excluir este abastecimento?");
      if (!confirmar) return;

      setExcluindo(true);

      const response = await api.delete(
        `/excluir-abastecimento/${trechoId}/${abastecimentoId}`
      );

      console.log(response.data);
      alert("Registro excluído com sucesso");

      // recarrega os dados da tela
      carregarViagemTrecho();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir abastecimento");
    } finally {
      setExcluindo(false);
    }
  };

  return {
    excluindo,
    excluirAbastecimento,
  };
}
