import React, { useEffect, useState } from 'react'
import CardInfoViagem from './CardInfoViagem'
import CardInfoTrecho from './CardInfoTrecho'
import CardInfoParada from './CardInfoParada'

const CardDadosInicio = ({ viagensTrechos,carregarViagemTrecho }) => {
  const [viagemSelecionada, setViagemSelecionada] = useState(null)
  const [trechoSelecionado, setTrechoSelecionado] = useState(null)

  // Quando o usuário muda de viagem
  const handleViagemChange = (e) => {
    const index = e.target.value
    const viagem = viagensTrechos[index]
    setViagemSelecionada(viagem)
    setTrechoSelecionado(null) // limpa o trecho ao trocar de viagem
  }

  // Quando o usuário muda de trecho
const handleTrechoChange = (e) => {
  const trechoId = e.target.value
  if (!viagemSelecionada) return

  const trecho = viagemSelecionada.trechos.find(t => String(t._id) === String(trechoId))
  setTrechoSelecionado(trecho ? { ...trecho } : null)
}

 // 🔥 useEffect para manter trechoSelecionado atualizado quando viagensTrechos mudar
  useEffect(() => {
    if (!trechoSelecionado || !viagemSelecionada) return;

    const viagemAtualizada = viagensTrechos.find(v => v._id === viagemSelecionada._id);
    if (!viagemAtualizada) return;

    const trechoAtualizado = viagemAtualizada.trechos.find(t => t._id === trechoSelecionado._id);
    if (trechoAtualizado) {
      setTrechoSelecionado({ ...trechoAtualizado });
    }
  }, [viagensTrechos]);
  return (
    <>
      <h3>Viagens Cadastradas</h3>

      {/* ---------- SELECT VIAGEM ---------- */}
      <label>
        Viagem
        <select onChange={handleViagemChange} defaultValue="">
          <option value="">Selecione uma viagem</option>
          {viagensTrechos.map((viagem, index) => (
            <option key={viagem._id} value={index}>
              {viagem.nome}
            </option>
          ))}
        </select>
      </label>

      {/* ---------- SELECT TRECHO ---------- */}
      <label>
        Trecho
        <select
  onChange={handleTrechoChange}
  value={trechoSelecionado?._id || ''}
  disabled={!viagemSelecionada || viagemSelecionada.trechos?.length === 0}
>
  {!viagemSelecionada ? (
    <option value="">Selecione uma viagem primeiro</option>
  ) : viagemSelecionada.trechos?.length > 0 ? (
    <>
      <option value="">Selecione um trecho</option>
      {viagemSelecionada.trechos.map((trecho) => (
        <option key={trecho._id} value={trecho._id}>
          {trecho.origem} — {trecho.destino}
        </option>
      ))}
    </>
  ) : (
    <option value="">Sem trechos cadastrados</option>
  )}
</select>
      </label>

      {/* ---------- INFORMAÇÕES ---------- */}
      <CardInfoViagem viagemSelecionada={viagemSelecionada} />
      <CardInfoTrecho 
      trechoSelecionado={trechoSelecionado} 
      carregarViagemTrecho={carregarViagemTrecho}
      />
      <CardInfoParada trechoSelecionado={trechoSelecionado} />
    </>
  )
}

export default CardDadosInicio
