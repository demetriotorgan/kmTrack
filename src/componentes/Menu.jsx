import React from 'react'
import { Car, Map, MapPinCheckInside, ChartNoAxesCombined } from "lucide-react"; // ícones bonitos
import '../styles/Menu.css';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();

    const menuItems = [
        {icon: <Map size={40} />, label:'Viagem', path:'/viagem'},
        {icon: <MapPinCheckInside  size={40} />, label:'Trecho', path:'/trecho'},
        {icon: <Car size={40} />, label:'Paradas', path:'/'},                
        {icon: <ChartNoAxesCombined  size={40} />, label:'Abastecimentos', path:'/estatisticas'},
        {icon: <ChartNoAxesCombined  size={40} />, label:'Pedagios', path:'/estatisticas'},
        {icon: <ChartNoAxesCombined  size={40} />, label:'Imprevistos', path:'/estatisticas'},
    ];

  return (
    <div className='menu-grid'>
        {menuItems.map((item, i)=>(
            <div key={i} className='menu-item' onClick={()=> navigate(item.path)}>
                <div className='icon'>{item.icon}</div>
                <span>{item.label}</span>
            </div>
        ))}
    </div>
  )
}

export default Menu