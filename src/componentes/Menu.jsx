import React from 'react'
import { Car, Map, MapPinCheckInside, ChartArea, Fuel, HandCoins} from "lucide-react"; // ícones bonitos
import '../styles/Menu.css';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();

    const menuItems = [
        {icon: <Map size={40} />, label:'Viagem', path:'/viagem'},
        {icon: <MapPinCheckInside  size={40} />, label:'Trecho', path:'/trecho'},
        {icon: <Car size={40} />, label:'Paradas', path:'/'},                
        {icon: <Fuel  size={40} />, label:'Posto', path:'/abastecimentos'},
        {icon: <HandCoins size={40} />, label:'Pedagios', path:'/pedagios'},
        {icon: <ChartArea  size={40} />, label:'Métricas', path:'/estatisticas'},
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