import { useState } from 'react';
import axios from 'axios';
import api from '../api/api';

export const useTrecho = () => {
  const trechoInicial = {
    viagemId: '',
    origem: '',
    destino: '',
    distancia: '',
    odometro: ''
  };

  const [trecho, setTrecho] = useState(trechoInicial);
  const [salvando, setSalvando] = useState(false);

  // 🔹 Atualizar campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrecho((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Validação simples
  const validarCampos = () => {
    const obrigatorios = ['origem', 'destino', 'distancia'];
    for (let campo of obrigatorios) {
      if (!trecho[campo] || trecho[campo].toString().trim() === '') {
        return `O campo "${campo}" é obrigatório.`;
      }
    }
    return null;
  };

  // 🔹 Envio ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroValidacao = validarCampos();
    if (erroValidacao) {
      alert(`❌ ${erroValidacao}`);
      return;
    }

    const confirmar = window.confirm('Deseja realmente salvar o novo Trecho?');
    if (!confirmar) {
      alert('🚫 Operação cancelada.');
      return;
    }

    try {
      setSalvando(true);
      const response = await api.post('/salvar-trecho', trecho);
      console.log(response.data);
      setTrecho(trechoInicial);
      alert('✅ Trecho salvo com sucesso!');
    } catch (error) {
      console.log('Erro ao salvar novo Trecho: ', error);
      alert('❌ Erro ao cadastrar trecho.');
    } finally {
      setSalvando(false);
    }
  };

  return {
    trecho,
    salvando,
    handleChange,
    handleSubmit
  };
};
