import React from 'react'
import '../styles/ModalCarregandoDados.css'

const ModalCarregandoDados = () => {
  return (
    <div className="loading-container">
        <p>Carregando dados...</p>
        {/* Se quiser, pode exibir um spinner aqui */}
        <div className="spinner"></div>
    </div>
  )
}

export default ModalCarregandoDados