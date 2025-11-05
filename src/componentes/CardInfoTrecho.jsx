import React, { useState } from 'react'
import api from '../api/api';
import ModalSalvando from './ModalSalvando'
import useAtualizarHorarioTrecho from '../hooks/useAtualizarHorarioTrecho';

const CardInfoTrecho = ({trechoSelecionado,carregarViagemTrecho}) => {
  const [hora, setHora] = useState('');
  const [tipo, setTipo] = useState('inicio');

  const {atualizarHorario, salvando} = useAtualizarHorarioTrecho(tipo, hora, setTipo, setHora,carregarViagemTrecho);
    
  const handleTipo = (e)=>{
    setTipo(e.target.value);
    console.log(tipo);    
  }

  if(!trechoSelecionado) return null;

  return (
    <>
    <div className='card-info-trecho'>
          <h3>Registrar Deslocamento</h3>
          <label>
            Distancia Objetivo para este trecho:
            <p className='distancia-objetivo'>{trechoSelecionado.distanciaPercorrida} Km</p>
          </label>
  <p>
  Horário de Início:{' '}
  {trechoSelecionado.tempoInicialMovimento
    ? new Date(trechoSelecionado.tempoInicialMovimento).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    : '--:--'}
</p>

<p>
  Horário de Fim:{' '}
  {trechoSelecionado.tempoFinalMovimento
    ? new Date(trechoSelecionado.tempoFinalMovimento).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    : '--:--'}
</p>

<p>
  Tempo Gasto:{' '}
  {trechoSelecionado.tempoInicialMovimento && trechoSelecionado.tempoFinalMovimento
    ? (() => {
        const inicio = new Date(trechoSelecionado.tempoInicialMovimento)
        const fim = new Date(trechoSelecionado.tempoFinalMovimento)
        const diffMs = fim - inicio // diferença em milissegundos
        const diffMin = Math.floor(diffMs / 60000) // converte para minutos
        const horas = Math.floor(diffMin / 60)
        const minutos = diffMin % 60
        return `${horas}h ${minutos}min`
      })()
    : '--'}
</p>
          <label>
            Tipo
            <select onChange={handleTipo}>
              <option value='inicio'>Início</option>
              <option value='fim'>Fim</option>
            </select>
          </label>
          <label>
            Horário
            <input type='time'
            value={hora}
            onChange={(e)=>setHora(e.target.value)}
            />
          </label>                    
          <button className='botao-principal' onClick={()=>atualizarHorario(trechoSelecionado._id)}>Salvar</button>
        </div>
        {salvando && (
          <ModalSalvando />
        )}
        
      </>
  )
}

export default CardInfoTrecho