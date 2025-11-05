import React, { useState } from 'react'
import ModalSalvando from './ModalSalvando';
import useSalvarParada from '../hooks/useSalvarParada';
import { NotebookPen,Trash } from "lucide-react";


const CardInfoParada = ({trechoSelecionado,carregarViagemTrecho}) => {
  const dataAtual = new Date();
const horas = String(dataAtual.getHours()).padStart(2, '0');
const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
const horarioLocal = `${horas}:${minutos}`;

  const [tipoParada, setTipoParada] = useState('descanso');
  const [tempoInicio, setTempoInicio] = useState(horarioLocal);
  const [tempoFinal, setTempoFinal] = useState('');
  const [local, setLocal] = useState('');
  const [obs, setObs] = useState('');
  
  const {salvarParada, salvando} = useSalvarParada(carregarViagemTrecho);

  const handleSalvar = async()=>{
     if (!trechoSelecionado?._id) return alert("Selecione um trecho primeiro.");

      await salvarParada(trechoSelecionado._id, {
      tipoParada,
      tempoInicio,
      tempoFinal,
      local,
      obs,
    });
    // Reseta os campos após salvar
    setTipoParada("descanso");
    setTempoInicio(horarioLocal);
    setTempoFinal("");
    setLocal("");
    setObs("");
  }

  const handleTipoParada = (e)=>{
    setTipoParada(e.target.value);
  }
 

  if(!trechoSelecionado) return null;

  return (
    <>
    <div className='card-info-parada'>
          <h3>Registrar Parada</h3> 
          <div className='lista-parada'>
            <p>Total de Paradas: {trechoSelecionado.paradas.length} </p>
            <p>Tempo Total: {' '} {trechoSelecionado.paradas
          .reduce((acc, parada) => acc + (parada.tempoDeParada || 0), 0)}{' '}
        min </p>            
          </div>                   
          <label>
            Tipo
            <select onChange={handleTipoParada}>
              <option value='descanso'>Descanso</option>
              <option value='alimentacao'>Alimentação</option>
              <option value='abastecimento'>Abastecimento</option>
              <option value='pernoite'>Pernoite</option>
              <option value='atrativo'>Atratativo</option>
            </select>
          </label>          
            <label>
              Horário Início:
              <input 
                type='time' 
                value={tempoInicio}
                onChange={(e)=>setTempoInicio(e.target.value)}
                />
            </label>

            <label>
              Horário Término:
              <input                 
                type='time' 
                value={tempoFinal}
                onChange={(e)=>setTempoFinal(e.target.value)}
                />
            </label>          

          <label>
            Local
            <input 
              type='text' 
              value={local}
              onChange={(e)=>setLocal(e.target.value)}
              />              
          </label>

          <label>
            Obs:
            <textarea
            value={obs}
            onChange={(e)=>setObs(e.target.value)}
            ></textarea>
          </label>

          <button className='botao-principal' onClick={handleSalvar}>Salvar</button>          
          </div>
         {trechoSelecionado.paradas
          ?.slice()                // cria uma cópia
          .reverse()               // inverte a ordem
          .map((parada, index) => (
            <div className="lista-parada" key={index}>
              <p><strong>Local:</strong> {parada.local}</p>
              <p><strong>Tempo Gasto:</strong> {parada.tempoDeParada} min</p>
              <p><strong>Obs:</strong> {parada.observacao}</p>
              <div className="lista-parada-botoes">
                <button><NotebookPen /></button>
                <button><Trash /></button>
              </div>
            </div>
        ))}
          {salvando && (
            <ModalSalvando />
          )}
      </>
  )
}

export default CardInfoParada