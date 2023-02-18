import './InventoryDetailsPage.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

    return (
        <main className='inventory-details-page'>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            {data && <section className='inventory-details-page__content-container'>
                <div className='inventory-details-page__header-content'>
                    <div className='inventory-details-page__header-container'>
                        <button className='inventory-details-page__arrow-back-button'>
                            <img className='inventory-details-page__arrow-back-icon' src={arrowBack} alt='arrow back icon'></img>
                        </button>
                        <h1 className='inventory-details-page__header'>{data.itemName}</h1>
                    </div>
                    <button className='inventory-details-page__edit-button'>
                        <img className='inventory-details-page__edit-icon' src={edit} alt='edit icon'></img>
                    </button>
                </div>
                <div className='inventory-details-page__item-details'>
                    <h4 className='inventory-details-page__item-header'>ITEM DESCRIPTION:</h4>
                    <p className='inventory-details-page__description'>{data.description}</p>
                    <h4 className='inventory-details-page__item-header'>CATEGORY:</h4>
                    <p className='inventory-details-page__category'>{data.category}</p>
                    <div className='inventory-details-page__status-quantity-container'>
                        <div className='inventory-details-page__status-content'>
                            <h4 className='inventory-details-page__item-header'>STATUS:</h4>
                            <p className='inventory-details-page__status'>
                            <span className={data.quantity ? 'mobile-inventory-card__status-tag--instock' : 'mobile-inventory-card__status-tag--outofstock'}>{data.status}</span>
                            </p>
                        </div>
                        <div className='inventory-details-page__quantity-content'>
                            <h4 className='inventory-details-page__item-header'>QUANTITY:</h4>
                            <p className='inventory-details-page__quantity'>{data.quantity}</p>
                        </div>
                    </div>
                    <h4 className='inventory-details-page__item-header'>WAREHOUSE:</h4>
                    <p className='inventory-details-page__warehouse'>{data.warehouseName}</p>
                </div>
            </section>}
        </main>
    )
}

export default InventoryDetailsPage;