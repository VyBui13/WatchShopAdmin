import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductImport from './pages/ProductImport'
import Account from './pages/Account'
import Category from './pages/Category'
import Manufacturer from './pages/Manufacturer'
import CategoryAddition from './pages/CategoryAddition'
import ManufacturerAddition from './pages/ManufacturerAddition'
import User from './pages/User'
import AdminManagement from './pages/AdminManagement'
import Order from './pages/Order'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/import" element={<ProductImport />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/addition" element={<CategoryAddition />} />
        <Route path="/manufacturer" element={<Manufacturer />} />
        <Route path="/manufacturer/addition" element={<ManufacturerAddition />} />
        <Route path="/admin" element={<AdminManagement />} />
        <Route path="/user" element={<User />} />
        <Route path="/order" element={<Order />} />

      </Routes>
    </>
  )
}

export default App
