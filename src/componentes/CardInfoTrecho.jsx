import React from 'react'

const CardInfoTrecho = () => {
  return (
    <div className='card-info-trecho'>
          <h3>Registrar Descoloamento</h3>
          <label>
            Distancia Objetivo para este trecho:
            <p>340km</p>
          </label>
          <label>
            Tipo
            <select>
              <option value='inicio'>Início</option>
              <option value='fim'>Fim</option>
            </select>
          </label>
          <label>
            Horário
            <input type='time' />
          </label>          
          <label>
            KM Percorridos:
            <input type='number' />
          </label>
          <button className='botao-principal'>Salvar</button>
        </div>
  )
}

export default CardInfoTrecho