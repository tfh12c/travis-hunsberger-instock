import './InventoryHomePage.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InventoryHomePageSortBar from '../../components/InventoryHomePageSortBar/InventoryHomePageSortBar';
import InventoryCard from '../../components/InventoryCard/InventoryCard';

function InventoryHomePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    //GET all inventory data
    const getInventory = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/inventory');
            setData(response.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError('Could not fetch data.');
        }
    }

      //Runs when component mounts
      useEffect(() => {
        getInventory();
    }, [])

    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase());
    }

    console.log(data);

    const sortInventory = () => {
        const sortedData = [].concat(data).sort((a, b) => a.itemName > b.itemName ? 1 : -1);
        setData(sortedData);
        setSort('inventory');
    }

    const sortCategory = () => {
        const sortedData = [].concat(data).sort((a, b) => a.category > b.category ? 1 : -1);
        setData(sortedData);
        setSort('category');
    }

    const sortStatus = () => {
        const sortedData = [].concat(data).sort((a, b) => a.status > b.status ? 1 : -1);
        setData(sortedData);
        setSort('status');
    }

    const sortQuantity = () => {
        const sortedData = [].concat(data).sort((a, b) => a.quantity > b.quantity ? 1 : -1);
        setData(sortedData);
        setSort('quantity');
    }

    const sortWarehouse = () => {
        const sortedData = [].concat(data).sort((a, b) => a.warehouseName > b.warehouseName ? 1 : -1);
        setData(sortedData);
        setSort('warehouse');
    }

    return (
        <main className='inventory-home-page'>
            <section className='inventory-home-page__content-container'>
                <div className='inventory-home-page__header-content'>  
                    <h1 className='inventory-home-page__header'>Inventory</h1>
                    <div className='inventory-home-page__search-add-container'>
                        <input className='inventory-home-page__search-input' type="search" id="search" placeholder='Search...' value={search} onChange={handleSearch}></input>
                        <Link to={'/inventory/add'} className='inventory-home-page__add-new-inventory-link'>
                            <button className='inventory-home-page__add-inventory-button'>+ Add New Item</button>
                        </Link>
                    </div>
                </div>
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                {data && <InventoryCard inventory={data} getInventory={getInventory} search={search} />}
            </section>
        </main>
    )
}

export default InventoryHomePage;