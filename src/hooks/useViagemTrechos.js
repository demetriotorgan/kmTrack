import { useState, useEffect, useCallback } from "react";
import api from "../api/api";

/**
 * Hook responsável por buscar e gerenciar a lista de viagens com trechos.
 * Retorna o estado de carregamento, os dados e uma função para recarregar.
 */
export default function useViagensTrechos(autoLoad = true) {
  const [viagensTrechos, setViagensTrecho] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const carregarViagemTrecho = useCallback(async () => {
    try {
      setCarregando(true);
      const response = await api.get("/viagens-com-trechos");
      console.log("✅ Viagens e Trechos:", response.data);
      setViagensTrecho(response.data);
    } catch (error) {
      console.error("❌ Erro ao carregar viagens/trechos:", error);
    } finally {
      setCarregando(false);
    }
  }, []);

  // Carrega automaticamente na montagem (opcional)
  useEffect(() => {
    if (autoLoad) carregarViagemTrecho();
  }, [autoLoad, carregarViagemTrecho]);

  return {
    viagensTrechos,
    carregando,
    carregarViagemTrecho,
  };
}
