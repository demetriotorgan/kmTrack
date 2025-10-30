import Menu from './componentes/Menu'
import './App.css'
import BarraNav from './componentes/BarraNav'
import Footer from './componentes/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  
  return (
    <>
    <BarraNav />
    <Menu />
    <div className="conteudo">
        <Outlet />
    </div>
    <Footer />
    </>
  )
}

export default App
