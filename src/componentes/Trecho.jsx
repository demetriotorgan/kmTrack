import React, { useEffect, useState } from 'react'
import { CalendarArrowUp, Save } from "lucide-react";
import { useTrecho } from '../hooks/useTrecho';
import { useCarregarViagem } from '../hooks/useCarregarViagem';
import ModalSalvando from './ModalSalvando';
import api from '../api/api';
import CardTrecho from './CardTrecho';


const Trecho = () => {  
const { trecho, salvando, handleChange, handleSubmit } = useTrecho();  
const { viagens } = useCarregarViagem();
const [trechos, setTrechos] = useState([]);

const listarTrechos = async()=>{
  const listaDeTrechos = await api.get('/viagens-com-trechos');
  console.log(listaDeTrechos.data);
  setTrechos(listaDeTrechos.data);
}

  useEffect(()=>{
    listarTrechos();
  },[]);

  return (
    <>
    <div className='container'>
      <div className='painel-form-cadastro'>
        <form onSubmit={handleSubmit}>
          <h3><CalendarArrowUp /> Cadastrar Novo Trecho</h3>          
          <label>
            Novo Trecho de:
            <select 
              name='viagemId'
              value={trecho.viagemId}
              onChange={handleChange}>
              <option>Selecione uma Viagem</option>
              {viagens.map((viagem, index)=>(
                <option key={index} value={viagem._id}>{viagem.nome}</option>
              ))}
              
            </select>
          </label>
          <label>
            Origem
            <input 
              type='text'
              name='origem' 
              value={trecho.origem}
              onChange={handleChange} 
            />
          </label>
          <label>
           Destino
            <input 
              type='text'
              name='destino' 
              value={trecho.destino}
              onChange={handleChange} 
            /> 
          </label>
          <label>
            Disância a Percorrer
            <input 
              type='number'
              name='distancia'
              value={trecho.distancia}
              onChange={handleChange}
            />
          </label>
          <label>
            Odometro
            <input 
            type='number'
            name='odometro'
            value={trecho.odometro}
            onChange={handleChange}
            />
          </label>
          <div className='painel-botao'>
          <button type='submit' className='botao-principal'><Save /> Salvar</button>              
          </div>
        </form>
      </div>      
      {salvando && (
        <ModalSalvando />
)}
    </div>
    {trechos.map((trecho, index)=>(
      <CardTrecho
        key={index}
        trecho={trecho}
      />
    ))}    
    </>
  )
}

export default Trecho