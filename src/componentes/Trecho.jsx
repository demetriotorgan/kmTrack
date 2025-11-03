import React, { useEffect, useState } from 'react'
import { CalendarArrowUp, Save } from "lucide-react";
import { useTrecho } from '../hooks/useTrecho';
import { useCarregarViagem } from '../hooks/useCarregarViagem';
import ModalSalvando from './ModalSalvando';
import api from '../api/api';
import CardTrecho from './CardTrecho';


const Trecho = () => {  
const { trecho, salvando, handleChange, handleSubmit,iniciarEdicao, editando } = useTrecho();  
const { viagens } = useCarregarViagem();
const [trechos, setTrechos] = useState([]);
const [deletando, setDeletando]=useState(false);


const listarTrechos = async()=>{
  const listaDeTrechos = await api.get('/viagens-com-trechos');  
  setTrechos(listaDeTrechos.data);
}

const deletarTrecho = async(id)=>{  
  const confirmar = window.confirm('Realmente deseja excluir esse trecho?');

  if(!confirmar){
    alert('Operação cancelada')
    return;
  }
  try {
    setDeletando(true);
  const response = await api.delete(`/deletar-trecho/${id}`)
  console.log(response.data);
  listarTrechos();
  alert('Trecho excluido com sucesso');  
  } catch (error) {
    console.error('Erro ao excluir trecho', error);
  }finally{
    setDeletando(false);
  }  
}

  useEffect(()=>{
    listarTrechos();
  },[]);  

  return (
    <>
    <div className='container'>
      <div className='painel-form-cadastro'>
        <form onSubmit={(e)=>handleSubmit(e,listarTrechos)}>
          <h3><CalendarArrowUp /> {editando ? "Editar Trecho" : "Cadastrar Novo Trecho"}</h3>          
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
              name='distanciaPercorrida'
              value={trecho.distanciaPercorrida}
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
          <button type='submit' className='botao-principal'><Save />{editando ? "Atualizar" : "Salvar"}</button>              
          </div>
        </form>
      </div>      
      {salvando || deletando && (
        <ModalSalvando />
)}
    </div>
    <div className='container'>
      <h2>Trechos Cadastrados</h2>
    </div>    
    {trechos.map((trecho, index)=>(
      <CardTrecho
        key={index}
        trecho={trecho}
        onEditarTrecho={iniciarEdicao}
        deletarTrecho={deletarTrecho}
      />
    ))}    
    </>
  )
}

export default Trecho