import './EditInventoryPage.scss';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import arrowBack from '../../assets/icons/arrow_back.svg';
import EditInventoryForm from '../../components/EditInventoryForm/EditInventoryForm';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function EditInventoryPage() {
    const [item, setItem] = useState(null);
    const [categories, setCategories] = useState(null);
    const [warehouses, setWarehouses] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    // console.log(warehouses);

    //GET item, categories, and warehouses state data
    const getData = async (id) => {
        setLoading(true);
        try {
            const [itemResponse, categoriesResponse, warehousesResponse] = await Promise.all([
                axios.get(`${API_ENDPOINT}/inventory/${id}`),
                axios.get(`${API_ENDPOINT}/category`),
                axios.get(`${API_ENDPOINT}/warehouse`)
            ]);
            setItem(itemResponse.data);
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

    //Runs when component mounts
    useEffect(() => {
        getData(id);
    }, [id])

    return (
        <main className='edit-inventory-page'>
            <section className='edit-inventory-page__content-container'>
                <div className='edit-inventory-page__header-content'>
                    <Link to={`/inventory/${id}`} className='edit-inventory-page__arrow-back-link'>
                        <button className='edit-inventory-page__arrow-back-button'>
                            <img className='edit-inventory-page__arrow-back-icon' src={arrowBack} alt='arrow back icon'></img>
                        </button>
                    </Link>
                    <h1 className='edit-inventory-page__header'>Edit Inventory Item</h1>
                </div>
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                {item && id && categories && warehouses && <EditInventoryForm item={item} id={id} categories={categories} warehouses={warehouses} />}
            </section>
        </main>
    )
}

export default EditInventoryPage;