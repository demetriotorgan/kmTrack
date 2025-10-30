import Menu from './componentes/Menu'
import './App.css'
import BarraNav from './componentes/BarraNav'
import Footer from './componentes/Footer'
import { Outlet } from 'react-router-dom'
import StatusConexao from './componentes/StatusConexao'

function App() {
  
  return (
    <>
    <BarraNav />
    <StatusConexao />
    <Menu />
    <div className="conteudo">
        <Outlet />
    </div>
    <Footer />
    </>
  )
}

export default App
