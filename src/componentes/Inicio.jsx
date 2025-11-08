import React, { useEffect, useState } from 'react'
import '../styles/Inicio.css'
import CardDadosInicio from './CardDadosInicio'
import api from '../api/api'

const Inicio = () => {
  const [viagensTrechos, setViagensTrecho] = useState([]);  
  const [carregando, setCarregando] = useState(false);

  const carregarViagemTrecho = async()=>{
    try {
      setCarregando(true);
    const response = await api.get('/viagens-com-trechos');
    console.log('Viagens e Trechos', response.data);
    setViagensTrecho(response.data);  
    } catch (error) {
      console.log(error);
    }finally{
      setCarregando(false);
    }
    
  }

  useEffect(()=>{
    carregarViagemTrecho();
  },[]);

  return (
    <div className='container'>      
      <div className='card'>
        <CardDadosInicio 
        viagensTrechos={viagensTrechos}
        carregarViagemTrecho={carregarViagemTrecho}
        carregando={carregando}
        />        
      </div>
    </div>   
  )
}

export default Inicio