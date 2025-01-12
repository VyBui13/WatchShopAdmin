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
import BestSeller from './pages/BestSeller'
import './styles/media.css'
import { useAuthorizations } from './components/AuthorizationContext'

function App() {
  const { authorization } = useAuthorizations();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {authorization.accountManagement && <Route path="/account" element={<Account />} />}
        {authorization.productManagement && <Route path="/product" element={<Product />} />}
        {authorization.productManagement && <Route path="/product/import" element={<ProductImport />} />}
        {authorization.categoryManagement && <Route path="/category" element={<Category />} />}
        {authorization.categoryManagement && <Route path="/category/addition" element={<CategoryAddition />} />}
        {authorization.categoryManagement && <Route path="/manufacturer" element={<Manufacturer />} />}
        {authorization.categoryManagement && <Route path="/manufacturer/addition" element={<ManufacturerAddition />} />}
        {authorization.staffManagement && <Route path="/admin" element={<AdminManagement />} />}
        {authorization.profileManagement && <Route path="/user" element={<User />} />}
        {authorization.orderManagement && <Route path="/order" element={<Order />} />}
        {authorization.reportManagement && <Route path="/bestseller" element={<BestSeller />} />}
      </Routes>
    </>
  )
}

export default App
