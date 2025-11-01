import React, { useState } from 'react'
import '../styles/Viagem.css'
import { Map, Save } from "lucide-react";
import api from '../api/api'


const Viagem = () => {
  const [viagem, setViagem] = useState({
    nome:'',
    origem:'',
    destino:'',
    distanciaObjetivo:'',
    dataInicio:'',
    dataFim:'',
    status:'planejada',
    notasGerais:''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setViagem((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();    
    //console.log(viagem); 

    const confirmar = window.confirm('Deseja realmente salvar esta viagem?');
    if(!confirmar){
      alert("🚫 Operação cancelada.");
      return;
    }
    try {
      const response = await api.post('/salvar-viagem', viagem);
      alert('✅ Viagem cadastrada com sucesso!');
      console.log('Dados Enviados: ', response.data);
      setViagem({
      nome: '',
      origem: '',
      destino: '',
      distanciaObjetivo: '',
      dataInicio: '',
      dataFim: '',
      status: 'planejada',
      notasGerais: ''
    });

    } catch (error) {
      console.error(error);
      alert('❌ Erro ao cadastrar viagem.');
    }
  };


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
    </div>
  )
}

export default Viagem