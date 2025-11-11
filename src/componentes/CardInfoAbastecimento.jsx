import React, { useEffect, useRef, useState } from 'react'
import '../styles/CardInfoAbastecimento.css'
import { Fuel,Pencil,Trash2,Pin } from "lucide-react"; // ícones bonitos
import api from '../api/api'
import { hhmmToIso, dateToIso,isoToHHMM,isoToDate,isoToDateEdit } from '../util/time';
import useSalvarAbastecimento from '../hooks/useSalvarAbastecimento';
import ModalSalvando from './ModalSalvando';
import useExcluirAbastecimento from '../hooks/useExcluirAbastecimento';

const CardInfoAbastecimento = ({viagensTrechos, carregarViagemTrecho, carregando}) => {
    const [viagemSelecionada, setViagemSelecionada] = useState(null);
    const [trechoSelecionado, setTrechoSelecionado] = useState(null);    
    const [editando, setEditando] = useState(false);
    const [abastecimentoId, setAbastecimentoId] = useState('');
    const formRef = useRef(null);
       
    //hook
const {salvando, novoAbastecimento, tipoAbastecimento, setTipoAbastecimento, handleChange, handleSalvar,setNovoAbastecimento} = useSalvarAbastecimento(carregarViagemTrecho);   
const { excluindo, excluirAbastecimento } = useExcluirAbastecimento(carregarViagemTrecho);


const handleViagemChange = (e)=>{
      const index = e.target.value
      const viagem = viagensTrechos[index]
      setViagemSelecionada(viagem)
      setTrechoSelecionado(null) // limpa o trecho ao trocar de viagem
    }

    const handleTrechoChange = (e)=>{
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

    const criarPayload = ()=>{
      return{          
        odometro: novoAbastecimento.odometro,
        litros: novoAbastecimento.litros,
        valorTotal: novoAbastecimento.valor_total,
        precoPorLitro: novoAbastecimento.preco_litro,
        cidade: novoAbastecimento.cidade,
        data: dateToIso(novoAbastecimento.data),
        hora: hhmmToIso(novoAbastecimento.hora),
        tipo: tipoAbastecimento
      }
    }

    const handleEditar = async(abastecimento)=>{          
      setEditando(true);
      // console.log(abastecimento)
      setNovoAbastecimento({
      odometro: abastecimento.odometro || "",
      litros: abastecimento.litros || "",
      valor_total: abastecimento.valorTotal || "",
      preco_litro: abastecimento.precoPorLitro || "",
      cidade: abastecimento.cidade ||"",
      data: isoToDateEdit(abastecimento.data ||""),
      hora: isoToHHMM(abastecimento.hora ||""),
      tipo: abastecimento.tipo ||"",
    });
    setAbastecimentoId(abastecimento._id);
    setTimeout(() => {
  formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
}, 50);
    }

    const handleSavarEdicao = async()=>{
      console.log('PayLoad: ', criarPayload());
      console.log('Abastecimento ID: ', abastecimentoId);
      console.log('Trecho ID: ', trechoSelecionado._id );

      const confirmar = window.confirm('Deseja realmente alterar este abastecimento?');
      if(!confirmar) return;

      try {
        console.log('Payload: ', criarPayload());
        console.log('Abastecimento id: ', abastecimentoId);
        console.log('Trecho ID: ', trechoSelecionado._id);
      const response = await  api.put(`/editar-abastecimento/${trechoSelecionado._id}/${abastecimentoId}`, criarPayload());
      console.log(response.data);
      alert('Abastecimento editado com sucesso');
      carregarViagemTrecho();
      } catch (error) {
        console.log(error);
      }
    }

      
  return (
    <div>       
      {(excluindo || salvando) && <ModalSalvando />}
        <label>
          Viagem
          <select 
          onChange={handleViagemChange} defaultValue="">
            <option value="">Selecione uma viagem</option>
            {viagensTrechos.map((viagem, index)=>(
              <option key={viagem._id} value={index}>{viagem.nome}</option>
            ))}            
          </select>
        </label>

        <label>
        Trecho
        <select
  onChange={handleTrechoChange}
  value={trechoSelecionado?._id || ''}
  disabled={!viagemSelecionada || viagemSelecionada.trechos?.length === 0}>

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

      {trechoSelecionado ? 
      <div className='container-abastecimento' ref={formRef}>
        <h4>Novo Abastecimento</h4>
        <label>
          Odometro
          <input type='number' 
          name="odometro"
          value={novoAbastecimento.odometro}
          onChange={handleChange}
          />
        </label>
        <label>
          Litros
          <input type='number' 
          name='litros'
          value={novoAbastecimento.litros}
          onChange={handleChange}
          />
        </label>
        <label>
          Valor Total
          <input type='number' 
          name='valor_total'
          value={novoAbastecimento.valor_total}
          onChange={handleChange}
          />
        </label>
        <label>
          Preço por Litro
          <input type='number' 
          name='preco_litro'
          value={novoAbastecimento.preco_litro}
          onChange={handleChange}
          />
        </label>
        <label>
          Cidade
          <input type='text' 
          name='cidade'
          value={novoAbastecimento.cidade}
          onChange={handleChange}
          />
        </label>
        <label>
          Data
          <input type='date' 
          name='data'
          value={novoAbastecimento.data}
          onChange={handleChange}
          />
        </label>
        <label>
          Hora
          <input type='time' 
          name='hora'
          value={novoAbastecimento.hora}
          onChange={handleChange}
          />
        </label>
        <label>
          Tipo
          <select onChange={(e)=>setTipoAbastecimento(e.target.value)}>            
            <option value='inicial'>Inicial</option>
            <option value='reposicao'>Reposição</option>
            <option value='final'>Final</option>
          </select>
        </label>
        <button className='botao-principal'  
        onClick={editando ? ()=>handleSavarEdicao() : () => handleSalvar(trechoSelecionado._id, carregarViagemTrecho)}
        disabled={salvando}><Pin />  {editando ? "Atualizar" : "Salvar"}</button>

        {trechoSelecionado.abastecimentos.length > 0 ?
  trechoSelecionado.abastecimentos
    .slice()        // cria uma cópia
    .reverse()      // inverte a ordem
    .map((abastecimento, index) => (
      <div className='card-abastecimento' key={index}>
        <h4><Fuel /> Abastecimento</h4>
        <p>Cidade: {abastecimento.cidade}</p>
        <p>Litros: {abastecimento.litros}</p>
        <p>Valor: R$ {abastecimento.valorTotal}</p>
        <p>Preço por Litro: {abastecimento.precoPorLitro}</p>
        <p>Data: {isoToDate(abastecimento.data)}</p>
        <p>Hora: {isoToHHMM(abastecimento.hora)}h</p>
        <p>Tipo: {abastecimento.tipo}</p>
        <p>Odometro: {abastecimento.odometro}</p>
        <div className="painel-botoes">
          <button onClick={()=>handleEditar(abastecimento)}><Pencil /></button>
          <button onClick={()=>excluirAbastecimento(trechoSelecionado._id, abastecimento._id)}><Trash2 /></button>
        </div>
      </div>
    ))
  : 'Sem abastecimentos para este trecho'
}
      </div> : ''
    }     
    </div>
  )
}

export default CardInfoAbastecimento