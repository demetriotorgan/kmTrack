// src/hooks/useExcluirParada.js
import { useState } from 'react';
import api from '../api/api';

export default function useExcluirParada(carregarViagemTrecho) {
  const [deletando, setDeletando] = useState(false);

  const excluirParada = async (id) => {
    const confirmar = window.confirm('Deseja realmente excluir esta parada?');
    if (!confirmar) return;

    try {
      setDeletando(true);
      const response = await api.delete(`/excluir-parada/${id}`);
      console.log('🗑️ Parada excluída:', response.data);
      alert('Parada excluída com sucesso');
      carregarViagemTrecho(); // Atualiza os dados após exclusão
    } catch (error) {
      console.error('❌ Erro ao excluir parada:', error);
      alert('Erro ao excluir parada');
    } finally {
      setDeletando(false);
    }
  };

  return { excluirParada, deletando };
}
