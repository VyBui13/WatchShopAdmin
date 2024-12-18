import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductImport from './pages/ProductImport'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/import" element={<ProductImport />} />
      </Routes>
    </>
  )
}

export default App
