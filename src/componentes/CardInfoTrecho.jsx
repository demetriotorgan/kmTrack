import React, { useState } from 'react'
import api from '../api/api';
import ModalSalvando from './ModalSalvando'
import useAtualizarHorarioTrecho from '../hooks/useAtualizarHorarioTrecho';

const CardInfoTrecho = ({trechoSelecionado}) => {
  const [hora, setHora] = useState('');
  const [tipo, setTipo] = useState('inicio');

  const {atualizarHorario, salvando} = useAtualizarHorarioTrecho(tipo, hora, setTipo, setHora);
    
  const handleTipo = (e)=>{
    setTipo(e.target.value);
    console.log(tipo);    
  }

  if(!trechoSelecionado) return null;

  return (
    <>
    <div className='card-info-trecho'>
          <h3>Registrar Descoloamento</h3>
          <label>
            Distancia Objetivo para este trecho:
            <p className='distancia-objetivo'>{trechoSelecionado.distanciaPercorrida} Km</p>
          </label>
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