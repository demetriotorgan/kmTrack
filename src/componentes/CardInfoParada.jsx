import React from 'react'

const CardInfoParada = () => {
  return (
    <div className='card-info-parada'>
          <h3>Registrar Parada</h3>
          <label>
            Tipo
            <select>
              <option value='descanso'>Descanso</option>
              <option value='alimentacao'>Alimentação</option>
              <option value='abastecimento'>Abastecimento</option>
              <option value='pernoite'>Pernoite</option>
              <option value='atrativo'>Atratativo</option>
            </select>
          </label>
          <label>
            Tempo
            <select>
              <option>Incial</option>
              <option>Final</option>
            </select>
            <label>
              Horário
              <input type='time' />
            </label>
          </label>
          <label>
            Local
            <input type='text' />
          </label>
          <label>
            Obs:
            <textarea></textarea>
          </label>
          <button className='botao-principal'>Salvar</button>
          </div>
  )
}

export default CardInfoParada