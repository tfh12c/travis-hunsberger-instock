import './AddInventoryPage.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import arrowBack from '../../assets/icons/arrow_back.svg';
import AddInventoryForm from '../../components/AddInventoryForm/AddInventoryForm';

function AddInventoryPage() {
    const [categories, setCategories] = useState(null);
    const [warehouses, setWarehouses] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = async () => {
        setLoading(true);
        try {
            const [categoriesResponse, warehousesResponse] = await Promise.all([
                axios.get('http://localhost:4000/category'),
                axios.get('http://localhost:4000/warehouse')
            ]);
            setCategories(categoriesResponse.data);
            setWarehouses(warehousesResponse.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError('Could not fetch data.');
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <main className='add-inventory-page'>
            <section className='add-inventory-page__content-container'>
                <div className='add-inventory-page__header-content'>
                    <Link to={'/inventory'} className='add-inventory-page__arrow-back-link'>
                        <button className='add-inventory-page__arrow-back-button'>
                            <img className='add-inventory-page__arrow-back-icon' src={arrowBack} alt='arrow back icon'></img>
                        </button>
                    </Link>
                    <h1 className='add-inventory-page__header'>Add New Inventory Item</h1>
                </div>
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                {categories && warehouses && <AddInventoryForm categories={categories} warehouses={warehouses} />}
            </section>
        </main>
    )
}

export default AddInventoryPage;