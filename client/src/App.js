import logo from './logo.svg';
import './App.css';
import Index from './pages/Index';
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';
import AdminLogin from './Admin/adminLogin';
import Home from './Admin/home/Home';
import List from './Admin/list/List';
import New from './Admin/new/New';
import Single from './Admin/single/Single';
import "./style/dark.scss"
import SoleHome from './Sole Distributor/soleHome/soleHome'
import SoleLogin from './Sole Distributor/soleLogin'
import SoleSignup from './Sole Distributor/soleSignup'
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';

 import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { productInputs, userInputs } from './Admin/formSource';
import NewProduct from './Admin/new/NewProduct';
import ProductList from './Admin/Components/datatable/ProductList'
import ProductUpdate from './Admin/new/ProductUpdate';
import SoleList from './Admin/Components/datatable/SoleList'
import SoleUpdate from './Admin/new/SoleUpdate';
import Table from './Admin/Components/table/Table'
import AdminLogout from './Admin/AdminLogout';
import CategoryProducts from './Admin/Components/Category/CategoryProducts';
import SoleProduct from './Sole Distributor/Components/Products/SoleProduct';
import DistributorNew from './Sole Distributor/Components/Distributors/DistributorNew';
import DistributorList from './Sole Distributor/Components/Distributors/DistributorList';
import DistributorUpdate from './Sole Distributor/Components/Distributors/DistributorUpdate';
import SoleLogout from './Sole Distributor/SoleLogout';
import Profile from './Sole Distributor/Components/Profile/Profile';

import DisHome from './Distributor/DisHome/DisHome'
import DisLogin from './Distributor/DisLogin'
import DisSignup from './Distributor/DisSignup'
import DisLogout from './Distributor/DisLogout';
import DisProfile from './Distributor/Components/Profile/Profile';
import AddRequest from './Distributor/Request/AddRequest';
import ViewRequest from './Distributor/Request/ViewRequest';
import RequestsManage from './Sole Distributor/Requests/RequestsManage';
import ViewRequests from './Sole Distributor/Requests/ViewRequests';
import Cart from './Sole Distributor/Components/Cart/Cart';
import Checkout from './Sole Distributor/Orders/Checkout';
import SoleOrders from './Sole Distributor/Orders/SoleOrders';
import AdminOrder from './Admin/Components/Orders/AdminOrders';
import BuyedProducts from './Sole Distributor/Components/Products/BuyedProducts';
import Inventory from './Sole Distributor/Components/Inventory/Inventory';
import SellProducts from './Sole Distributor/Components/Products/SellProducts';
import MyProducts from './Distributor/Components/products/MyProducts';
import ViewProducts from './Distributor/Components/products/ViewProducts';
import ShopHome from './Shopkeeper/Components/ShopHome';
import ShopCart from './Shopkeeper/Components/ShopCart';
import DisInventory from './Distributor/Components/inventory/DisInventory';
import ShopSignup from './Shopkeeper/Components/ShopSignup';
import ShopLogin from './Shopkeeper/Components/ShopLogin';
import AddComplain from './Shopkeeper/Components/AddComplain';
import ViewComplains from './Shopkeeper/ViewComplains';
import ShopkeeperLogout from './Shopkeeper/Components/ShopkeeperLogout';
import ManageComplaints from './Distributor/Components/Complains/ManageComplain';
import AllCategories from './Admin/Components/Category/AllCategories';
import NewCategory from './Admin/Components/Category/NewCategory';
import OrderHistory from './Admin/Components/Orders/OrderHistory';
import SoleOrderHistory from './Sole Distributor/Orders/SoleOrderHistory';
import UpdateCategory from './Admin/Components/Category/UpdateCategory';
import ProductDetails from './Admin/Components/ProductDetails/ProductDetails';
import OrderDetails from './Admin/Components/Orders/OrderDetails';
import OrderHistoryDetails from './Admin/Components/Orders/OrderHistoryDetails';
import SoleOrderHistoryDetails from './Sole Distributor/Orders/SoleOrderHistoryDetails';
import SoleOrderDetails from './Sole Distributor/Orders/SoleOrdersDetails';
import ProductHistory from './Distributor/Components/products/ProductHistory';
import ShopProducts from './Shopkeeper/ShopProducts';
import ShopkeeperCheckout from './Shopkeeper/Components/ShopkeeperCheckout';
import ShopkeeperOrder from './Shopkeeper/Components/ShopkeeperOrder';
import ShopkeeperOrderDetails from './Shopkeeper/Components/ShopkeeperOrderDetails';
import ShopkeeperOrderHistory from './Shopkeeper/Components/ShopkeeperOrderHistory';
import ShopkeeperOrderHistoryDetails from './Shopkeeper/Components/ShopkeeperOrderHistoryDetails';
import DisOrders from './Distributor/Components/Orders/DisOrders';
import DisOrderHistory from './Distributor/Components/Orders/DisOrderHistory';
import DisOrderDetails from './Distributor/Components/Orders/DisOrdersDetails';
import DisOrderHistoryDetails from './Distributor/Components/Orders/DisOrderHistoryDetails';
import Trend from './Admin/Components/ML/Trend';
import Sales from './Distributor/Components/Sales/Sales';
import Task from './Distributor/Task/Task';
import Trending from './Sole Distributor/Components/Trending/Trending';
function App() {
  const {darkMode} = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark":"app"}>
      <Router>
        <Routes>
          {/* Landing Page Routes */}
        <Route exact path='/' element={<Index/>}></Route>
        <Route exact path='/about' element={<About/>}></Route>
        <Route exact path='/service' element={<Service/>}></Route>
        <Route exact path='/contact' element={<Contact/>}></Route>
       

        {/* Admin Components Routes */}
        <Route exact path='/admin/login' element={<AdminLogin />} />
        <Route exact path='/admin' element={<Home/>} />
        <Route exact path='/admin/logout' element={<AdminLogout/>} />


        <Route exact path='/admin/users'>
            <Route index element={<SoleList/>}/>
            <Route exact path=":id" element={<SoleUpdate/>}/>
            <Route exact path="new" element={<New/>}/>
       </Route>

        <Route exact path='/admin/products'>
            <Route index element={<ProductList/>}/>
            <Route exact path=":id" element={<ProductUpdate/>}/>
            <Route exact path=":id/details" element={<ProductDetails/>}/>
            <Route exact path="new" element={<NewProduct />}/>
       </Route>
       <Route exact path="/admin/categories" element={<AllCategories/>} />
       <Route exact path="/admin/categories/new" element={<NewCategory/>} />
       <Route exact path="/admin/categories/:id" element={<CategoryProducts/>} />
       <Route exact path="/admin/category/:id" element={<UpdateCategory/>} />
       <Route exact path='/admin/order' element={<AdminOrder/>}></Route>
       <Route exact path='/admin/order/history' element={<OrderHistory/>}></Route>
       <Route exact path='/admin/order/history/:id' element={<OrderHistoryDetails/>}></Route>
       <Route exact path='/admin/order/:id' element={<OrderDetails/>}></Route>
       <Route exact path='/admin/trend/' element={<Trend/>}></Route>

       
       
       {/* Sole Distributor's Components Routes */}

       <Route exact path='/soleDistributor' element={<SoleHome/>} />
       <Route exact path='/soleDistributor/register' element={<SoleSignup />} />
        <Route exact path='/soleDistributor/signin' element={<SoleLogin />} />
        <Route exact path='/soleDistributor/logout' element={<SoleLogout/>} />
        <Route path="/soleDistributor/profile/:id" element={<Profile />} />

       <Route exact path='/soleDistributor/products' element={<SoleProduct/>}></Route>
      
       <Route exact path='/soleDistributor/users'>
            <Route index element={<DistributorList/>}/>
            <Route exact path=":id" element={<DistributorUpdate/>}/>
            <Route exact path="new" element={<DistributorNew/>}/>
       </Route>

       <Route exact path='/soleDistributor/applications' element={<RequestsManage/>}></Route>
       <Route exact path='/soleDistributor/applications/status' element={<ViewRequests/>}></Route>
       <Route exact path = {'/soleDistributor/cart'} element= {<Cart/>}/>
       <Route exact path = {'/soleDistributor/checkout'} element= {<Checkout/>}/>
       <Route exact path = {'/soleDistributor/orders'} element= {<SoleOrders/>}/>
       <Route exact path = {'/soleDistributor/orders/history'} element= {<SoleOrderHistory/>}/>
       <Route exact path = {"/soleDistributor/orders/history/:id"} element= {<SoleOrderHistoryDetails/>}/>
       <Route exact path = {"/soleDistributor/orders/:id"} element= {<SoleOrderDetails/>}/>
       <Route exact path = {'/soleDistributor/my-products'} element= {<BuyedProducts/>}/>
       <Route exact path = {'/soleDistributor/inventory'} element= {<Inventory/>}/>
       <Route exact path = {'/soleDistributor/sell-products'} element= {<SellProducts/>}/>
       <Route exact path = {'/soleDistributor/trending'} element= {<Trending/>}/>


      {/*Distributor's Components Routes */}

      <Route exact path='/distributor' element={<DisHome/>} />
       <Route exact path='/distributor/register' element={<DisSignup />} />
        <Route exact path='/distributor/signin' element={<DisLogin />} />
        <Route exact path='/distributor/logout' element={<DisLogout/>} />
        <Route path="/distributor/profile/:id" element={<DisProfile />} />
        <Route path="/distributor/request/new" element={<AddRequest />} />
        <Route path="/distributor/requests" element={<ViewRequest
        />} />
        <Route path="/distributor/products" element={<ViewProducts/>} />
        <Route path="/distributor/buy-history" element={<ProductHistory/>} />
        <Route path="/distributor/my-products" element={<MyProducts />} />
        <Route path="/distributor/inventory" element={<DisInventory />} />
        <Route path="/distributor/complains" element={<ManageComplaints />} />
        <Route path="/distributor/orders" element={<DisOrders />} />
        <Route path="/distributor/orders/:id" element={<DisOrderDetails />} />
        <Route path="/distributor/orders/history" element={<DisOrderHistory />} />
        <Route path="/distributor/orders/history/:id" element={<DisOrderHistoryDetails />} />
        <Route path="/distributor/salesteam" element={<Sales />} />
        <Route path="/distributor/task" element={<Task />} />
        {/*Shopkeeper's Components Routes */}
        <Route exact path='/shopkeeper/register' element={<ShopSignup/>} />
        <Route exact path='/shopkeeper/login' element={<ShopLogin/>} />
        <Route exact path='/shopkeeper' element={<ShopHome/>} />
        <Route exact path='/shopkeeper/complain' element={<AddComplain/>} />
        <Route exact path='/shopkeeper/view-complain' element={<ViewComplains/>} />
        <Route exact path='/shopkeeper/cart' element={<ShopCart/>} />
        <Route exact path='/shopkeeper/checkout' element={<ShopkeeperCheckout/>} />
        <Route exact path='/shopkeeper/products' element={<ShopProducts/>} />
        <Route exact path='/shopkeeper/orders' element={<ShopkeeperOrder/>} />
        <Route exact path='/shopkeeper/orders/:id' element={<ShopkeeperOrderDetails/>} />
        <Route exact path='/shopkeeper/orders/history' element={<ShopkeeperOrderHistory/>} />
        <Route exact path='/shopkeeper/orders/history/:id' element={<ShopkeeperOrderHistoryDetails/>} />
        <Route exact path='/shopkeeper/logout' element={<ShopkeeperLogout/>} />


      
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
