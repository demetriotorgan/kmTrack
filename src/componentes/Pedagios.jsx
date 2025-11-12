import React from 'react'
import { HandCoins } from "lucide-react"; // ícones bonitos
import CardInfoPedagios from './CardInfoPedagios';
import useViagensTrechos from '../hooks/useViagemTrechos';

const Pedagios = () => {
  const {viagensTrechos, carregando, carregarViagemTrecho} = useViagensTrechos();

  return (
    <div className='container'>
      <div className='card'>
        <h3><HandCoins /> Pedágio</h3>
        <CardInfoPedagios 
        viagensTrechos={viagensTrechos}
        carregarViagemTrecho={carregarViagemTrecho}
        carregando={carregando}
        />
      </div>
    </div>
  )
}

export default Pedagios