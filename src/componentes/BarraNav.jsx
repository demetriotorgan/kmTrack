import React from 'react'
import '../styles/BarraNav.css'
import IconeMapa from '../assets/maps.png'
const BarraNav = () => {
  return (
    <div className='barra-principal'>
        <div className='barra-icone'>
        <img src={IconeMapa} alt="" />
        </div>
        <div className='barra-titulo'>
         <h1>KmTrack</h1>
         <small>Diário de Bordo</small>
        </div>
        
    </div>
  )
}

export default BarraNav