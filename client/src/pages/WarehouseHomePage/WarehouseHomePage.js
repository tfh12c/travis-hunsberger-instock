import './WarehouseHomePage.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WarehouseHomePageSortBar from '../../components/WarehouseHomePageSortBar/WarehouseHomePageSortBar';
import WarehouseCard from '../../components/WarehouseCard/WarehouseCard';


function WarehouseHomePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [sortActive, setSortActive] = useState('');

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

     //Runs when component mounts
     useEffect(() => {
        getWarehouses();
    }, [])

    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase());
    }

    const sortWarehouse = () => {
        const sortedData = [].concat(data).sort((a, b) => a.name > b.name ? 1 : -1);
        setData(sortedData);
        setSortActive('warehouse')
    }

    const sortAddress = () => {
        const sortedData = [].concat(data).sort((a, b) => a.address > b.address ? 1 : -1);
        setData(sortedData);
        setSortActive('address');
    }

    const sortContactName = () => {
        const sortedData = [].concat(data).sort((a, b) => a.contact.name > b.contact.name ? 1 : -1);
        setData(sortedData);
        setSortActive('contactName');
    }

    const sortContactInfo = () => {
        const sortedData = [].concat(data).sort((a, b) => a.contact.email > b.contact.email ? 1 : -1);
        setData(sortedData);
        setSortActive('contactInfo');
    }
    
    return (
        <main className='warehouse-home-page'>
            <section className='warehouse-home-page__content-container'>
                <div className='warehouse-home-page__header-content'>  
                    <h1 className='warehouse-home-page__header'>Warehouses</h1>
                    <div className='warehouse-home-page__search-add-container'>
                        <input className='warehouse-home-page__search-input' type="search" id="search" placeholder='Search...' value={search} onChange={handleSearch}></input>
                        <Link to={'/warehouse/add'} className='link warehouse-home-page__add-new-warehouse-link'> 
                            <button className='warehouse-home-page__add-warehouse-button'>+ Add New Warehouse</button>
                        </Link>
                    </div>
                </div>
                {data && <WarehouseHomePageSortBar sortActive={sortActive} sortWarehouse={sortWarehouse} sortAddress={sortAddress} sortContactName={sortContactName} sortContactInfo={sortContactInfo} />}
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                {data && <WarehouseCard warehouses={data} getWarehouses={getWarehouses} search={search} />}
            </section>
        </main>
    )
}

export default WarehouseHomePage;