import React, { useState } from 'react'
import ModalSalvando from './ModalSalvando';
import useSalvarParada from '../hooks/useSalvarParada';
import { NotebookPen, Trash } from "lucide-react";
import { obterHorarioLocal } from '../util/horarioLocal';
import api from '../api/api';
import useExcluirParada from '../hooks/useExcluirParada';
import { isoToHHMM, hhmmToIso } from '../util/time';
import { calcularDiferencaHorario } from '../util/calcularDiferencaHorario';
import useEditarParada from '../hooks/useEditarParada';

const CardInfoParada = ({ trechoSelecionado, carregarViagemTrecho }) => { 
  const horarioLocal = obterHorarioLocal();
  
  const [tipoParada, setTipoParada] = useState('descanso');
  const [tempoInicioISO, setTempoInicioISO] = useState(horarioLocal); 
  const [tempoFinalISO, setTempoFinalISO] = useState(''); 
  const [local, setLocal] = useState('');
  const [obs, setObs] = useState('');
  
  //Hook's
  const {salvarParada, salvando} = useSalvarParada(carregarViagemTrecho);
  const {excluirParada, deletando} = useExcluirParada(carregarViagemTrecho);
  const { editando, salvandoEdicao, iniciarEdicao, salvarEdicao} = useEditarParada(carregarViagemTrecho);

  
  if (!trechoSelecionado) return null;

  return (
    <>
      <div className='card-info-parada'>
        <h3>Registrar Parada</h3>
        <div className='lista-parada'>
          <p>Total de Paradas: {trechoSelecionado.paradas?.length ?? 0} </p>
          <p>
            Tempo Total:{' '}
            {trechoSelecionado.paradas?.reduce((acc, parada) => acc + (parada.tempoDeParada || 0), 0) ?? 0} min
          </p>
        </div>

        <label>
          Tipo
          <select value={tipoParada} onChange={(e)=>setTipoParada(e.target.value)}>
            <option value='descanso'>Descanso</option>
            <option value='alimentacao'>Alimentação</option>
            <option value='abastecimento'>Abastecimento</option>
            <option value='pernoite'>Pernoite</option>
            <option value='atrativo'>Atrativo</option>
          </select>
        </label>

        <label>
          Horário Início:
          <input
            type='time'
            value={tempoInicioISO}
            onChange={(e)=>setTempoInicioISO(e.target.value)}
          />
        </label>

        <label>
          Horário Término:
          <input
            type='time'
            value={tempoFinalISO}          
            onChange={(e)=>setTempoFinalISO(e.target.value)}
          />
        </label>

        <label>
          Local
          <input
            type='text'
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
        </label>

        <label>
          Obs:
          <textarea value={obs} onChange={(e) => setObs(e.target.value)} />
        </label>

      <button className='botao-principal' 
        onClick={()=> editando ? 
        salvarEdicao(tipoParada, tempoInicioISO, tempoFinalISO, local, obs) : salvarParada(trechoSelecionado._id,tipoParada, tempoInicioISO, tempoFinalISO, local, obs)}>{editando ? 'Atualziar' : 'Salvar'}</button>
      </div>

      {/* lista de paradas (mais recentes primeiro) */}
      {trechoSelecionado.paradas
        ?.slice()
        .reverse()
        .map((parada, index) => (
          <div className="lista-parada" key={index}>
            <p><strong>Local:</strong> {parada.local}</p>
            <p><strong>Tipo:</strong> {parada.tipo}</p>
            <p><strong>Tempo Gasto:</strong> {parada.tempoDeParada} min</p>
            <p><strong>Obs:</strong> {parada.observacao}</p>
            <div className="lista-parada-botoes">
              <button onClick={()=>iniciarEdicao(parada, setTipoParada, setTempoInicioISO, setTempoFinalISO, setLocal, setObs)}><NotebookPen /></button>
              <button onClick={()=>excluirParada(parada._id)}><Trash /></button>
            </div>
          </div>
        ))} 
        {salvando || deletando || salvandoEdicao && (
          <ModalSalvando />
        )}   
    </>
  );
};

export default CardInfoParada;
