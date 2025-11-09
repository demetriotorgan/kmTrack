import React from 'react'
import { Fuel } from "lucide-react"; // ícones bonitos
import useViagensTrechos from '../hooks/useViagemTrechos';
import CardInfoAbastecimento from '../componentes/CardInfoAbastecimento'

const Abastecimentos = () => {
  const { viagensTrechos, carregando, carregarViagemTrecho} = useViagensTrechos();

  return (
    <div className='container'>
      <div className='card'>
        <h3><Fuel /> Abastecimento</h3>
        <CardInfoAbastecimento 
        viagensTrechos={viagensTrechos}
        carregarViagemTrecho={carregarViagemTrecho}
        carregando={carregando}
        />
      </div>
    </div>
  )
}

export default Abastecimentos