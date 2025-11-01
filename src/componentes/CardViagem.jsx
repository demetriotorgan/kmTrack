import React from 'react'
import '../styles/CardViagem.css'
import { MapPinPlus, MapPinPen, MapPinXInside } from "lucide-react";


const CardViagem = ({viagemCadastrada}) => {
  return (
    <div className='card'>
        <h3><MapPinPlus /> {viagemCadastrada.nome}</h3>
        <p>Distância: {viagemCadastrada.distanciaObjetivo}</p>
        <p>Trechos: </p>
        <p>Tempo Gasto: </p>
        <p>Custo Total: </p>
        <div className='painel-botao'>
        <button className='botao-secundario'><MapPinPen /> Editar</button>
        <button className='botao-atencao'><MapPinXInside /> Excluir</button>
        </div>
    </div>
  )
}

export default CardViagem