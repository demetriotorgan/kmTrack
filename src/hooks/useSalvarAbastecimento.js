// src/hooks/useSalvarAbastecimento.js
import { useState } from "react";
import api from "../api/api";
import { hhmmToIso, dateToIso } from "../util/time";

export default function useSalvarAbastecimento() {
  const [salvando, setSalvando] = useState(false);
  const [tipoAbastecimento, setTipoAbastecimento] = useState("inicial");

  const [novoAbastecimento, setNovoAbastecimento] = useState({
    odometro: "",
    litros: "",
    valor_total: "",
    preco_litro: "",
    cidade: "",
    data: "",
    hora: "",
    tipo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNovoAbastecimento((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const criarPayload = () => {
    return {
      odometro: novoAbastecimento.odometro,
      litros: novoAbastecimento.litros,
      valorTotal: novoAbastecimento.valor_total,
      precoPorLitro: novoAbastecimento.preco_litro,
      cidade: novoAbastecimento.cidade,
      data: dateToIso(novoAbastecimento.data),
      hora: hhmmToIso(novoAbastecimento.hora),
      tipo: tipoAbastecimento,
    };
  };

  const resetarFormulario = () => {
    setNovoAbastecimento({
      odometro: "",
      litros: "",
      valor_total: "",
      preco_litro: "",
      cidade: "",
      data: "",
      hora: "",
      tipo: "",
    });
  };

  const handleSalvar = async (trechoId, callbackAtualizar) => {
    const confirmar = window.confirm(
      "Deseja realmente salvar este abastecimento?"
    );
    if (!confirmar) return;

    try {
      setSalvando(true);

      const payload = criarPayload();
      console.log("Payload:", payload);

      const response = await api.post(
        `/adicionar-abastecimento/${trechoId}`,
        payload
      );
      console.log(response.data);

      alert("Abastecimento salvo com sucesso!");

      resetarFormulario();

      if (callbackAtualizar) callbackAtualizar(); // recarrega dados
    } catch (error) {
      console.error("Erro ao salvar abastecimento:", error);
      alert("Erro ao salvar abastecimento.");
    } finally {
      setSalvando(false);
    }
  };

  return {
    salvando,
    novoAbastecimento,
    tipoAbastecimento,
    setTipoAbastecimento,
    handleChange,
    handleSalvar,
  };
}
