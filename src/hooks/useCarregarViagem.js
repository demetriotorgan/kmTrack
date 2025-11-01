import { useState, useEffect } from 'react';
import api from '../api/api';

export const useCarregarViagem = () => {
  const [viagens, setViagens] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const carregarViagens = async () => {
    setCarregando(true);
    setErro(null);

    try {
      const response = await api.get('/listar-viagens');
      setViagens(response.data);
    } catch (error) {
      console.error('Erro ao carregar viagens:', error);
      setErro('Não foi possível carregar as viagens.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarViagens();
  }, []);

  return { viagens, carregando, erro, recarregar: carregarViagens };
};
