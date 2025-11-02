import React, { useState } from 'react'
import { CalendarArrowUp, Save } from "lucide-react";
import axios from 'axios';
import { useCarregarViagem } from '../hooks/useCarregarViagem';


const Trecho = () => {  
  const trechoInicial = {
    viagemId: '',
    origem: '',
    destino: '',
    distancia: '',
    odometro: ''
  }
  const [salvando, setSalvando]= useState(false);
  const [trecho, setTrecho] = useState(trechoInicial);

  //hooks
  const {viagens} = useCarregarViagem();

    // 🔹 Função genérica de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrecho((prev) => ({ ...prev, [name]: value }));
  };

  const validarCampos = ()=>{
      const obrigatorios = ['origem', 'destino', 'distancia'];
      for(let campo of obrigatorios){
        if(!trecho[campo] || trecho[campo].toString().trim() === ''){
          return `O campo "${campo}" é obrigatório.`;
        }
      }
      return null;
    };
   
  // 🔹 Enviar para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //Validação
    const erroValidacao = validarCampos();
    if(erroValidacao){
      alert(`❌ ${erroValidacao}`);
      return;
    }
    
    const confirmar = window.confirm('Deseja realmente salvar o novo Trecho?');
    if(!confirmar){
      alert('🚫 Operação cancelada.');
      return;
    }
    try {
      setSalvando(true);
      console.log('Trecho salvo:', trecho);
      const response = await axios.post('http://localhost:5000/salvar-trecho', trecho);
      console.log(response.data);
       alert('✅ Trecho salvo com sucesso!')
       setTrecho(trechoInicial)
    } catch (error) {
      console.log('Erro ao salvar novo Trecho: ', error);
      alert('❌ Erro ao cadastrar viagem.');
    }finally{
      setSalvando(false);
    }
  };

  return (
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
              onChange={handleChange} 
            />
          </label>
          <label>
           Destino
            <input 
              type='text'
              name='destino' 
              onChange={handleChange} 
            /> 
          </label>
          <label>
            Disância a Percorrer
            <input 
              type='number'
              name='distancia'
              onChange={handleChange}
            />
          </label>
          <label>
            Odometro
            <input 
            type='number'
            name='odometro'
            onChange={handleChange}
            />
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

export default Trecho