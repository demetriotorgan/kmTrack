import { useState } from "react";
import api from "../api/api";

const useSalvarParada = (carregarViagemTrecho) => {
  const [salvando, setSalvando] = useState(false);

  // Função que gera o payload corretamente
  const gerarPayloadParada = ({ tipoParada, tempoInicio, tempoFinal, local, obs }) => {
    if (!tempoInicio || !tempoFinal) {
      throw new Error("Informe os horários de início e término da parada");
    }

    const dataInicio = new Date();
    const dataFim = new Date();

    const [hInicio, mInicio] = tempoInicio.split(":");
    const [hFim, mFim] = tempoFinal.split(":");

    dataInicio.setHours(hInicio);
    dataInicio.setMinutes(mInicio);
    dataInicio.setSeconds(0);

    dataFim.setHours(hFim);
    dataFim.setMinutes(mFim);
    dataFim.setSeconds(0);

    // Calcula diferença em minutos
    const diffMs = dataFim - dataInicio;
    const diffMin = Math.max(0, Math.floor(diffMs / 60000));

    return {
      tipo: tipoParada,
      tempoInicialParada: dataInicio.toISOString(),
      tempoFinalParada: dataFim.toISOString(),
      tempoDeParada: diffMin,
      local: local || "Estrada",
      observacao: obs || ""
    };
  };

  const salvarParada = async (trechoId, dadosParada) => {
    try {
      const confirmar = window.confirm("Deseja realmente salvar esta parada?");
      if (!confirmar) return;

      setSalvando(true);
      const payload = gerarPayloadParada(dadosParada);
      const response = await api.post(`/salvar-parada/${trechoId}`, payload);

      alert("Parada salva com sucesso!");
      carregarViagemTrecho();
      return response.data;
    } catch (error) {
      console.error("Erro ao salvar parada:", error);
      alert(error.message || "Erro ao salvar parada.");
    } finally {
      setSalvando(false);
    }
  };

  return { salvarParada, salvando };
};

export default useSalvarParada;
