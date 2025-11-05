import { useState } from "react";
import api from "../api/api";

const useAtualizarHorarioTrecho = (tipo, hora, setTipo,setHora)=>{
    const [salvando, setSalvando] = useState(false);

const payload = (tipo, hora) => {
  const data =  new Date();
  const [h,m] = hora.split(':');
  data.setHours(h);
  data.setMinutes(m);
  return {
    [tipo === 'inicio' ? 'tempoInicialMovimento' : 'tempoFinalMovimento']: data.toISOString()
  };
}

    const atualizarHorario = async(id)=>{
  try {
      // console.log('Gerando payload: ',payload(tipo, hora));         
      const confirmar = window.confirm('Realmente deseja Salvar este horário?');
      if(!confirmar){
        return;
      }
      setSalvando(true);
      const response = await api.put(`/atualizar-tempo/${id}`, payload(tipo, hora));
      alert('Horário registrado com sucesso');
      setTipo('Inicio');
      setHora('');
    } catch (error) {
      console.log(error);
    }finally{
      setSalvando(false);
    }
    }
    return {atualizarHorario, salvando}
};

export default useAtualizarHorarioTrecho