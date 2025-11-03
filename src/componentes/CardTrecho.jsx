import React from 'react'
import { ArrowRightLeft,Pencil,MapPinXInside} from "lucide-react";
import '../styles/CardTrecho.css'


const CardTrecho = ({trecho, onEditarTrecho, deletarTrecho}) => {
  return (
    <div className='container'>        
    <div className="card-trecho">
  <div className="cabecalho-trecho">
    <h3>{trecho.nome}</h3>
    <p className="titulo-viagem">Viagem Selecionada</p>
  </div>

  <div className="lista-trechos">
    <p className="titulo-secao">Trechos:</p>
    {trecho.trechos.map((item, index) => (
      <div className="linha-trecho" key={index}>
  <span className="cidade">{item.origem}</span>
  <span className="icone"><ArrowRightLeft size={18} /></span>
  <span className="cidade">{item.destino}</span>

  <div className="botoes-acoes">
    <button onClick={() => onEditarTrecho(item)}>
      <Pencil />
    </button>
    <button className="excluir" onClick={() => deletarTrecho(item._id)}>
      <MapPinXInside />
    </button>
  </div>
</div>
    ))}
  </div>
</div>

    </div>
  )
}

export default CardTrecho