import { useState } from "react";
import api from "../api/api";
import { hhmmToIso, dateToIso, isoToHHMM, isoToDateEdit } from "../util/time";

export default function useEditarAbastecimento(setNovoAbastecimento, formRef) {
  const [editando, setEditando] = useState(false);
  const [abastecimentoId, setAbastecimentoId] = useState("");

  // -----------------------------------------
  // ✅ Preencher formulário para edição
  // -----------------------------------------
  const iniciarEdicao = (abastecimento) => {
    setEditando(true);

    setNovoAbastecimento({
      odometro: abastecimento.odometro || "",
      litros: abastecimento.litros || "",
      valor_total: abastecimento.valorTotal || "",
      preco_litro: abastecimento.precoPorLitro || "",
      cidade: abastecimento.cidade || "",
      data: isoToDateEdit(abastecimento.data || ""),
      hora: isoToHHMM(abastecimento.hora || ""),
      tipo: abastecimento.tipo || "",
    });

    setAbastecimentoId(abastecimento._id);

    // 🔥 Scroll para o formulário
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // -----------------------------------------
  // ✅ Criar payload para atualizar
  // -----------------------------------------
  const criarPayload = (novoAbastecimento, tipoAbastecimento) => {
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

  // -----------------------------------------
  // ✅ Enviar PUT — Editar abastecimento
  // -----------------------------------------
  const salvarEdicao = async (
    trechoId,
    novoAbastecimento,
    tipoAbastecimento,
    carregarViagemTrecho
  ) => {
    const confirmar = window.confirm("Deseja realmente alterar este abastecimento?");
    if (!confirmar) return;

    try {
      const payload = criarPayload(novoAbastecimento, tipoAbastecimento);

      const response = await api.put(
        `/editar-abastecimento/${trechoId}/${abastecimentoId}`,
        payload
      );

      alert("Abastecimento editado com sucesso!");
      carregarViagemTrecho();

      // Finaliza edição
      setEditando(false);
      setAbastecimentoId("");
      setNovoAbastecimento({
        odometro: "",
      litros: "",
      valor_total: "",
      preco_litro: "",
      cidade: "",
      data: "",
      hora: "",
      tipo: ""
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao editar abastecimento");
    }
  };

  return {
    editando,
    iniciarEdicao,
    salvarEdicao,
  };
}
