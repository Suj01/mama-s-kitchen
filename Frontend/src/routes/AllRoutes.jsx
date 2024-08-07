import { Route, Routes } from "react-router-dom"
import Home from "../components/Home"
import Cart from "../components/Cart"



const AllRoutes = () => {
  return (
  <>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/cart" element={<Cart/>}/>
  
  </Routes>
  </>
  )
}

export default AllRoutes