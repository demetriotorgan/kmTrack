import React from 'react'
import '../styles/CardViagem.css'
import { MapPinPlus, MapPinPen, MapPinXInside } from "lucide-react";


const CardViagem = ({viagemCadastrada, setViagem, recarregar,formRef}) => {
  // 🔹 Função de edição: carrega os dados no formulário do pai
  const handleEditar = () => {
    // Converte datas ISO → formato yyyy-MM-dd (para o input type=date)
    const formatarData = (dataISO) => dataISO ? dataISO.slice(0, 10) : '';

    setViagem({
      _id: viagemCadastrada._id,
      nome: viagemCadastrada.nome,
      origem: viagemCadastrada.origem,
      destino: viagemCadastrada.destino,
      distanciaObjetivo: viagemCadastrada.distanciaObjetivo,
      dataInicio: formatarData(viagemCadastrada.dataInicio),
      dataFim: formatarData(viagemCadastrada.dataFim),
      status: viagemCadastrada.status,
      notasGerais: viagemCadastrada.notasGerais
    });
 // 🔹 rola dentro do #root
  // const root = document.getElementById('root');
  // root?.scrollTo({ top: 0, behavior: 'smooth' });
  // document.getElementById('root').scrollTo({ top: 0, behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🔹 Função para excluir viagem
  const handleExcluir = async () => {
    const confirmar = window.confirm(`Deseja realmente excluir a viagem "${viagemCadastrada.nome}"?`);
    if (!confirmar) return;

    try {
      await api.delete(`/excluir-viagem/${viagemCadastrada._id}`);
      alert('🗑️ Viagem excluída com sucesso!');
      await recarregar();
    } catch (error) {
      console.error(error);
      alert('❌ Erro ao excluir a viagem.');
    }
  };

  return (
    <div className='card'>
        <h3><MapPinPlus /> {viagemCadastrada.nome}</h3>
        <p>Distância: {viagemCadastrada.distanciaObjetivo}</p>
        <p>Trechos: </p>
        <p>Tempo Gasto: </p>
        <p>Custo Total: </p>
        <div className='painel-botao'>
        <button className='botao-secundario' onClick={handleEditar}><MapPinPen /> Editar</button>
        <button className='botao-atencao' onClick={handleExcluir}><MapPinXInside /> Excluir</button>
        </div>
    </div>
  )
}

export default CardViagem