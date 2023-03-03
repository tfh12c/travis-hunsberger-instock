import './InventoryHomePage.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MobileInventoryCard from '../../components/MobileInventoryCard/MobileInventoryCard';

function InventoryHomePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

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

    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase());
    }

    //Runs when component mounts
    useEffect(() => {
        getInventory();
    }, [])

    return (
        <main className='inventory-home-page'>
            <section className='inventory-home-page__content-container'>
                <div className='inventory-home-page__header-content'>  
                    <h1 className='inventory-home-page__header'>Inventory</h1>
                    <input className='inventory-home-page__search-input' type="search" id="search" placeholder='Search...' value={search} onChange={handleSearch}></input>
                    <Link to={'/inventory/add'}>
                        <button className='inventory-home-page__add-warehouse-button'>+ Add New Item</button>
                    </Link>
                </div>
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                {data && <MobileInventoryCard inventory={data} getInventory={getInventory} search={search} />}
            </section>
        </main>
    )
}

export default InventoryHomePage;