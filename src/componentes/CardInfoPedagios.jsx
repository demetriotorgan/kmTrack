import React, { useEffect, useState } from 'react'
import api from '../api/api';
import ModalSalvando from './ModalSalvando'
import { dateToIso, isoToDate } from '../util/time';
import '../styles/CardInfoPedagio.css'
import { Fuel,Pencil,Trash2,Pin } from "lucide-react"; // ícones bonitos
import useSalvarPedagio from '../hooks/useSalvarPedagio';

const CardInfoPedagios = ({viagensTrechos, carregando, carregarViagemTrecho}) => {
    const [viagemSelecionada,setViagemSelecionada] = useState('');
    const[trechoSelecionado, setTrechoSelecionado] = useState('');
    const [novoPedagio, setNovoPedagio] = useState({
        valor: "",
        local: "",
        data: ""
    });

const { salvarPedagio, salvando } = useSalvarPedagio();   

const handleChange = (e)=>{
        const {name, value} = e.target;

        setNovoPedagio((prev)=>({
            ...prev,
            [name]: value,
        }));
    };

const handleViagemChange = (e)=>{
        const index = e.target.value
      const viagem = viagensTrechos[index]
      setViagemSelecionada(viagem)
      setTrechoSelecionado(null)
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

const handleSalvar = async () => {
    if (!trechoSelecionado?._id) {
      alert("Selecione um trecho antes de salvar.");
      return;
    }

    const sucesso = await salvarPedagio(
      trechoSelecionado._id,
      novoPedagio,
      carregarViagemTrecho
    );

    if (sucesso) {
      setNovoPedagio({ valor: "", local: "", data: "" });
    }
  };

  return (
    <div>
        {salvando && (
            <ModalSalvando />
        )}        
        <label>
            Viagem
            <select
            onChange={handleViagemChange}
            defaultValue="">
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
      <>
      <h3>Novo Pedágio</h3>
      <label>
        Local
        <input 
            type='text' 
            name='local'
            value={novoPedagio.local}
            onChange={handleChange}
        />
        </label>
        <label>
        Valor
        <input 
            type='number' 
            name= 'valor'
            value={novoPedagio.valor}
            onChange={handleChange}
        />
        </label>  
        <label>
        Data
        <input 
            type='date' 
            name='data'
            value={novoPedagio.data}
            onChange={handleChange}
        />
        </label>
        <button className='botao-principal' onClick={handleSalvar}>Salvar</button>
      </>:''}

     {trechoSelecionado?.pedagios?.length > 0 ? 
     trechoSelecionado?.pedagios
     .slice()
     .reverse()
        .map((pedagio) => (
    <div key={pedagio._id} className="card-pedagio">
      <p>Local: {pedagio.local}</p>
      <h3>Valor: R${pedagio.valor}</h3>
      <p>Data: {isoToDate(pedagio.data)}</p>
      <div className='painel-botoes'>
        <button><Pencil /></button>
          <button><Trash2 /></button>
      </div>
    </div>
  ))
 : 
  <p>Nenhum pedágio registrado neste trecho.</p>
}

    </div>
  )
}

export default CardInfoPedagios