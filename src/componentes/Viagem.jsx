import React from 'react'
import '../styles/Viagem.css'
import { Map, Save } from "lucide-react"; // ícones bonitos


const Viagem = () => {
  return (
    <div className='container'>
      <div className='painel-form-cadastro'>
        <h3><Map /> Cadastrar Viagem</h3>
        <small>Informe os dados da viagem</small>
        <label>
          Nome
          <input type='text'/>
        </label>
        <label>
          Origem
          <input type='text'/>
        </label>
        <label>
          Destino
          <input type='text'/>
        </label>
        <label>
          Distância
          <input type='number'/>
        </label>
        <label>
          Data de Início
          <input type='date'/>
        </label>
        <label>
          Data Término
          <input type='date'/>
        </label>
        <label>
          Status
          <select>
            <option>Planejada</option>
            <option>Em Andamento</option>
            <option>Finalizada</option>
          </select>
        </label>
        <label>
          Notas
          <textarea></textarea>
        </label>
        <div className='painel-botao'>
        <button className='botao-principal'><Save /> Salvar</button>
        </div>
      </div>
    </div>
  )
}

export default Viagem