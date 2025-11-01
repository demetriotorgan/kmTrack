import React, { useState } from 'react'
import '../styles/Viagem.css'
import { Map, Save } from "lucide-react";
import { useViagem } from '../hooks/useSalvarViagem';

const Viagem = () => {  
 const { viagem, handleChange, handleSubmit, salvando } = useViagem();

  return (
    <div className='container'>
      <div className='painel-form-cadastro'>
        <form onSubmit={handleSubmit}>
        <h3><Map /> Cadastrar Viagem</h3>
        <small>Informe os dados da viagem</small>
        <label>
          Nome
          <input 
            type='text'
            name='nome'
            value={viagem.nome}
            onChange={handleChange}
            />
        </label>
        <label>
          Origem
          <input 
            type='text'
            name='origem'
            value={viagem.origem}
            onChange={handleChange}
            />
        </label>
         <label>
          Destino
          <input
            type='text'
            name='destino'
            value={viagem.destino}
            onChange={handleChange}
          />
        </label>
        <label>
          Distância
          <input           
            type='number'
            name='distanciaObjetivo'
            value={viagem.distanciaObjetivo}
            onChange={handleChange}
            />
        </label>
        <label>
          Data de Início
          <input 
          type='date'
            name='dataInicio'
            value={viagem.dataInicio}
            onChange={handleChange}
          />
        </label>
        <label>
          Data Término
          <input 
          type='date'
            name='dataFim'
            value={viagem.dataFim}
            onChange={handleChange}
          />
        </label>
        <label>
          Status
          <select
            name='status'
            value={viagem.status}
            onChange={handleChange}
          >
            <option value='planejada'>Planejada</option>
            <option value='em_andamento'>Em Andamento</option>
            <option value='finalizada'>Finalizada</option>
          </select>
        </label>
        <label>
          Notas
          <textarea
            name='notasGerais'
            value={viagem.notasGerais}
            onChange={handleChange}
          ></textarea>
        </label>
        <div className='painel-botao'>
        <button type='submit' className='botao-principal'><Save /> Salvar</button>
        </div>
      </form>
      </div>
  {salvando && (
  <div className="modal-loading">
    <div className="loader"></div>
    <p>Salvando viagem...</p>
  </div>
)}
    </div>
  )
}

export default Viagem