import react from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import NotFound from './pages/notfound'
import ProtectedRoute from './components/ProtectedRoute'

function Logout(){
  localStorage.clear()
  return <Navigate to = "/login" />
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path = "/login" element = {<Login/>}></Route>
        <Route path = "/logout" element = {<Logout/>}></Route>
        <Route  path='/register' element = {<RegisterAndLogout/>}></Route>
        <Route path='*' element = {<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
