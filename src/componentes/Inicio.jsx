import React, { useEffect, useState } from 'react'
import '../styles/Inicio.css'
import CardDadosInicio from './CardDadosInicio'
import api from '../api/api'
import useViagensTrechos from '../hooks/useViagemTrechos'


const Inicio = () => { 
  const { viagensTrechos, carregando, carregarViagemTrecho} = useViagensTrechos();
  
  return (
    <>
    <div className='container'>      
      <div className='card'>
        <CardDadosInicio 
        viagensTrechos={viagensTrechos}
        carregarViagemTrecho={carregarViagemTrecho}
        carregando={carregando}
        />        
      </div>
    </div>       
    </>
  )
}

export default Inicio