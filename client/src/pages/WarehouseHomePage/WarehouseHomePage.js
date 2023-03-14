import './WarehouseHomePage.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WarehouseCard from '../../components/WarehouseCard/WarehouseCard';


function WarehouseHomePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    //GET all warehouse data from backend api
    const getWarehouses = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/warehouse');
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
        getWarehouses();
    }, [])
    
    return (
        <main className='warehouse-home-page'>
            <section className='warehouse-home-page__content-container'>
                <div className='warehouse-home-page__header-content'>  
                    <h1 className='warehouse-home-page__header'>Warehouses</h1>
                    <input className='warehouse-home-page__search-input' type="search" id="search" placeholder='Search...' value={search} onChange={handleSearch}></input>
                    <Link to={'/warehouse/add'} className='link'> 
                        <button className='warehouse-home-page__add-warehouse-button'>+ Add New Warehouse</button>
                    </Link>
                </div>
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                {data && <WarehouseCard warehouses={data} getWarehouses={getWarehouses} search={search} />}
            </section>
        </main>
    )
}

export default WarehouseHomePage;