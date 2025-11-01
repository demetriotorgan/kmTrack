import { useState } from 'react';
import api from '../api/api';

export const useViagem = ({recarregar}) => {
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

  // 🔹 Validação dos campos obrigatórios
  const validarCampos = () => {
    const obrigatorios = ['nome', 'origem', 'destino', 'distanciaObjetivo', 'dataInicio', 'dataFim'];
    for (let campo of obrigatorios) {
      if (!viagem[campo] || viagem[campo].toString().trim() === '') {
        return `O campo "${campo}" é obrigatório.`;
      }
    }
    return null; // tudo ok
  };

  // 🔹 Envia os dados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Verifica campos obrigatórios antes de enviar
    const erroValidacao = validarCampos();
    if (erroValidacao) {
      alert(`❌ ${erroValidacao}`);
      return;
    }

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
      
      //Atualiza lista de viagens com novo registro salvo
      await recarregar();

      // 🔹 Reseta o formulário
      setViagem(viagemInicial);
    } catch (error) {
      console.error(error);
      alert('❌ Erro ao cadastrar viagem.');
    } finally {
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
