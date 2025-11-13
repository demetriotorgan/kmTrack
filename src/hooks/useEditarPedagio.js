import { useState } from "react";
import { isoToDateEdit } from "../util/time";
import api from "../api/api";

export default function useExcluirPedagio({carregarViagemTrecho,setNovoPedagio,novoPedagio}){
const [editando, setEditando] = useState(false);
const [pedagioId, setPedagioId] = useState('');
const [salvandoEdicao, setSalvandoEdicao] = useState(false);

const handleEditar = (pedagio)=>{
    setEditando(true);
    setNovoPedagio({
        valor: pedagio.valor,
        local: pedagio.local,
        data: isoToDateEdit(pedagio.data)        
    });        
    setPedagioId(pedagio._id);
}
    const editarPedagio = async(trechoId)=>{
        const confirmar = window.confirm('Deseja editar este registro?');
    if (!confirmar) return;

    try {
        setSalvandoEdicao(true);
        const response = await api.put(`/atualizar-pedagio/${trechoId}/${pedagioId}`, novoPedagio);
        console.log(response.data);
        alert('Registro alterado com sucesso');
        setNovoPedagio({
        valor: "",
        local: "",
        data: ""
        });
        carregarViagemTrecho();

    } catch (error) {
        console.log(error);
    }finally{
        setSalvandoEdicao(false);
    }
    }
    return {
        handleEditar,
        editarPedagio,
        setPedagioId,
        editando,
        salvandoEdicao
    }
};

