import './WarehouseHomePage.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MobileWarehouseCard from '../../components/MobileWarehouseCard/MobileWarehouseCard';


function WarehouseHomePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/warehouse/delete/${id}`);
            getWarehouses();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWarehouses();
    }, [])
    
    return (
        <main className='warehouse-home-page'>
            <section className='warehouse-home-page__content-container'>
                <div className='warehouse-home-page__header-content'>  
                    <h1 className='warehouse-home-page__header'>Warehouses</h1>
                    <input className='warehouse-home-page__search-input' type="search" id="search" placeholder='Search...'></input>
                    <button className='warehouse-home-page__add-warehouse-button'>+ Add New Warehouse</button>
                </div>
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                {data && <MobileWarehouseCard warehouses={data} handleDelete={handleDelete} />}
            </section>
        </main>
    )
}

export default WarehouseHomePage;