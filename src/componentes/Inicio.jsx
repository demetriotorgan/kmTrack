import React from 'react'
import '../styles/Inicio.css'
import CardDadosInicio from './CardDadosInicio'
import CardInfoViagem from './CardInfoViagem'
import CardInfoTrecho from './CardInfoTrecho'
import CardInfoParada from './CardInfoParada'

const Inicio = () => {
  return (
    <div className='container'>      
      <div className='card'>
        <CardDadosInicio />
        <CardInfoViagem />
        <CardInfoTrecho />
        <CardInfoParada />         
      </div>
    </div>   
  )
}

export default Inicio