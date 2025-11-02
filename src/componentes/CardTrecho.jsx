import React from 'react'
import { ArrowRightLeft} from "lucide-react";


const CardTrecho = ({trecho}) => {
  return (
    <div className='container'>
        <h3>Trechos Cadastrados</h3>
        <div className='card'>
            <p>Viagem: {trecho.nome} </p>
            <p>Trechos: </p>
            {trecho.trechos.map((item, index)=>(
                <p key={index}>{item.origem} <ArrowRightLeft /> {item.destino}</p>
            ))}
            
        </div>
    </div>
  )
}

export default CardTrecho