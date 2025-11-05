import React from 'react'
import '../styles/Inicio.css'

const Inicio = () => {
  return (
    <div className='container'>      
      <div className='card'>
        <h3>Viagem Cadastradas</h3>
        <label>
          Viagem
          <select>
            <option>Selecione uma viagem</option>
          </select>
        </label>
        <label>
          Trecho
          <select>
            <option>Selecione um Trecho</option>
          </select>
        </label>

        <div className='card-info-viagem'>
          <p>Viagem:</p>
          <p>Destino: </p>
          <p>Origem: </p>
          <p>Total de KM: </p>          
        </div>

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
        </div>
      </div>
    </div>
  )
}

export default Inicio