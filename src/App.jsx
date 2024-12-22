import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductImport from './pages/ProductImport'
import Account from './pages/Account'
import Category from './pages/Category'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/import" element={<ProductImport />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </>
  )
}

export default App
