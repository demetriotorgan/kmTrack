import React, { useEffect, useState } from 'react'
import '../styles/Inicio.css'
import CardDadosInicio from './CardDadosInicio'
import api from '../api/api'

const Inicio = () => {
  const [viagensTrechos, setViagensTrecho] = useState([]);  

  const carregarViagemTrecho = async()=>{
    const response = await api.get('/viagens-com-trechos');
    console.log('Viagens e Trechos', response.data);
    setViagensTrecho(response.data);
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
        />        
      </div>
    </div>   
  )
}

export default Inicio