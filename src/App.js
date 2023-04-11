import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Navbar/index'
import Products from './components/Products/index'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import ProductDetail from './components/ProductDetail'
import Profile from './components/Profile/index'
import PrivateRoutes from './components/Private/PrivateRoutes'
import NoPage from './components/NoPage/index'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Basket from './components/Basket/index'
import Electronics from './Pages/Electronics'
import Wears from './Pages/Wears'
import Jewelery from './Pages/Jewelery'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path="products" element={<Products />} />
            <Route path=":productId" element={<ProductDetail />} />
            <Route path="basket" element={<Basket />} />
            <Route element={<PrivateRoutes />}>
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="products/electronics" element={<Electronics />} />
            <Route path="products/wears" element={<Wears />} />
            <Route path="products/jewelery" element={<Jewelery />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
