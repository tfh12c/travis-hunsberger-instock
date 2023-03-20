import './InventoryDetailsPage.scss';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import arrowBack from '../../assets/icons/arrow_back.svg';
import edit from '../../assets/icons/edit.svg';

function InventoryDetailsPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    // GET inventory by ID
    const getInventoryById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/inventory/${id}`);
            setData(response.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError('Could not fetch inventory data.');
        }
    }

    // Runs when component mounts 
    useEffect(() => {
        getInventoryById(id);
    }, [id])

    console.log(data);

    return (
        <main className='inventory-details-page'>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            {data && <section className='inventory-details-page__content-container'>
                <div className='inventory-details-page__header-content'>
                    <div className='inventory-details-page__header-container'>
                        <Link to={'/inventory'}>  
                            <button className='inventory-details-page__arrow-back-button'>
                                <img className='inventory-details-page__arrow-back-icon' src={arrowBack} alt='arrow back icon'></img>
                            </button>
                        </Link>
                        <h1 className='inventory-details-page__header'>{data.itemName}</h1>
                    </div>
                    <Link to={`/inventory/edit/${data.id}`}>
                        <button className='inventory-details-page__edit-button'>
                            <img className='inventory-details-page__edit-icon' src={edit} alt='edit icon'></img>
                            <p className='inventory-details-page__edit-text'>Edit</p>
                        </button>
                    </Link>
                </div>
                <div className='inventory-details-page__item-details'>
                    <div className='inventory-details-page__item-category-container'>
                        <h4 className='inventory-details-page__item-header'>ITEM DESCRIPTION:</h4>
                        <p className='inventory-details-page__description'>{data.description}</p>
                        <h4 className='inventory-details-page__item-header'>CATEGORY:</h4>
                        <p className='inventory-details-page__category'>{data.category}</p>
                    </div>
                    <div className='inventory-details-page__status-quantity-warehouse-container'>
                        <div className='inventory-details-page__status-quantity-container'>
                            <div className='inventory-details-page__status-content'>
                                <h4 className='inventory-details-page__item-header'>STATUS:</h4>
                                <p className='inventory-details-page__status'>
                                    <span className={data.quantity ? 'inventory-details-page__status-tag--instock' : 'inventory-details-page__status-tag--outofstock'}>{data.status}</span>
                                </p>
                            </div>
                            <div className='inventory-details-page__quantity-content'>
                                <h4 className='inventory-details-page__item-header'>QUANTITY:</h4>
                                <p className='inventory-details-page__quantity'>{data.quantity}</p>
                            </div>
                        </div>
                        <div className='inventory-details-page__warehouse-content'>
                            <h4 className='inventory-details-page__item-header'>WAREHOUSE:</h4>
                            <p className='inventory-details-page__warehouse'>{data.warehouseName}</p>
                        </div>
                    </div>
                </div>
            </section>}
        </main>
    )
}

export default InventoryDetailsPage;