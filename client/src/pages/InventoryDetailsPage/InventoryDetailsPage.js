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
        console.log(data);
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
            </section>}
        </main>
    )
}

export default InventoryDetailsPage;