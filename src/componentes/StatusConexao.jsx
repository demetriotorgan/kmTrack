import React, { useEffect, useState } from 'react'
import { Wifi, WifiOff } from 'lucide-react'; // Ícones do lucide
import '../styles/StatusConexao.css'

const StatusConexao = () => {
      const [online, setOnline] = useState(navigator.onLine);

useEffect(() => {
    const atualizarStatus = () => setOnline(navigator.onLine);
    window.addEventListener('online', atualizarStatus);
    window.addEventListener('offline', atualizarStatus);
    return () => {
      window.removeEventListener('online', atualizarStatus);
      window.removeEventListener('offline', atualizarStatus);
    };
  }, []);

  return (
<div className={`status-conexao ${online ? 'online' : 'offline'}`}>
      {online ? (
        <>
          <Wifi size={18} />
          <span>Conectado</span>
        </>
      ) : (
        <>
          <WifiOff size={18} />
          <span>Sem conexão</span>
        </>
      )}
    </div>    
  );
}

export default StatusConexao