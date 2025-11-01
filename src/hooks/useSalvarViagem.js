import { useState } from 'react';
import api from '../api/api';

export const useViagem = () => {
  const viagemInicial = {
    nome: '',
    origem: '',
    destino: '',
    distanciaObjetivo: '',
    dataInicio: '',
    dataFim: '',
    status: 'planejada',
    notasGerais: ''
  };

  const [viagem, setViagem] = useState(viagemInicial);
  const [salvando, setSalvando] = useState(false);

  // 🔹 Atualiza qualquer campo do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setViagem((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 🔹 Envia os dados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmar = window.confirm('Deseja realmente salvar esta viagem?');
    if (!confirmar) {
      alert('🚫 Operação cancelada.');
      return;
    }

    try {
    setSalvando(true);
      const response = await api.post('/salvar-viagem', viagem);
      alert('✅ Viagem cadastrada com sucesso!');
      console.log('Dados enviados:', response.data);

      // 🔹 Reseta o formulário
      setViagem(viagemInicial);
    } catch (error) {
      console.error(error);
      alert('❌ Erro ao cadastrar viagem.');
    }finally{
        setSalvando(false);
    }
  };

  return {
    viagem,
    handleChange,
    handleSubmit,
    salvando
  };
};
