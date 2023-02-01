import './App.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';
import AddInventoryPage from './pages/AddInventoryPage/AddInventoryPage';
import AddWarehousePage from './pages/AddWarehousePage/AddWarehousePage';
import EditInventoryPage from './pages/EditInventoryPage/EditInventoryPage';
import EditWarehousePage from './pages/EditWarehousePage/EditWarehousePage';
import InventoryDetailsPage from './pages/InventoryDetailsPage/InventoryDetailsPage';
import InventoryHomePage from './pages/InventoryHomePage/InventoryHomePage';
import WarehouseDetailsPage from './pages/WarehouseDetailsPage/WarehouseDetailsPage';
import WarehouseHomePage from './pages/WarehouseHomePage/WarehouseHomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
// import Footer from './components/Footer/Footer';


function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      <Switch>
        <Redirect from="/" exact to="/warehouse" />
        <Route path="/warehouse" exact component={WarehouseHomePage} />
        <Route path="/warehouse/add" component={AddWarehousePage} />
        <Route path="/warehouse/edit/:id" component={EditWarehousePage} />
        <Route path="/warehouse/:id" component={WarehouseDetailsPage} />
        <Route path="/inventory" exact component={InventoryHomePage} />
        <Route path="/inventory/add" component={AddInventoryPage} />
        <Route path="/inventory/edit/:id" component={EditInventoryPage} />
        <Route path="/inventory/:id" component={InventoryDetailsPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
