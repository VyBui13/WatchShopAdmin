import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductImport from './pages/ProductImport'
import Account from './pages/Account'
import Category from './pages/Category'
import User from './pages/User'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/import" element={<ProductImport />} />
        <Route path="/category" element={<Category />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  )
}

export default App
