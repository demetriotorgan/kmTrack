import React from 'react'

const CardInfoViagem = ({viagemSelecionada}) => {
  if(!viagemSelecionada) return null;
  return (
    <div className='card-info-viagem'>
          <p>Viagem: {viagemSelecionada.nome || '' }</p>
          <p>Destino: {viagemSelecionada.destino || '' } </p>
          <p>Origem: {viagemSelecionada.origem || ''} </p>
          <p>Total de KM: {viagemSelecionada.distanciaObjetivo || '' } </p>          
    </div>
  )
}

export default CardInfoViagem