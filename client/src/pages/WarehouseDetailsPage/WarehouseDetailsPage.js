import './WarehouseDetailsPage.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import arrowBack from '../../assets/icons/arrow_back.svg';
import edit from '../../assets/icons/edit.svg';
import MobileWarehouseInventoryCard from '../../components/MobileWarehouseInventoryCard/MobileWarehouseInventoryCard';

function WarehouseDetailsPage() {
    const [warehouseData, setWarehouseData] = useState(null);
    const [inventoryData, setInventoryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    //GET warehouse by ID
    const getWarehouseById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/warehouse/${id}`);
            setWarehouseData(response.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError('Could not fetch warehouse data.');
        }
    }

    // GET inventory of warehouse by ID
    const getInventoryOfWarehouse = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/warehouse/${id}/inventory`);
            setInventoryData(response.data);
            setLoading(false);
            setError(null)
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError('Could not fetch inventory data.');
        }
    }

    // Runs when component mounts
    useEffect(() => {
        getWarehouseById(id);
        getInventoryOfWarehouse(id);
    }, [id])

    // console.log(warehouseData);
    // console.log(inventoryData); 

    return (
        <main className='warehouse-details-page'>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            {warehouseData && <section className='warehouse-details-page__content-container'>
                <div className='warehouse-details-page__header-content'>
                    <div className='warehouse-details-page__header-container'>
                        <Link to={'/warehouse'} className='link'>  
                            <button className='warehouse-details-page__arrow-back-button'>
                                <img className='warehouse-details-page__arrow-back-icon' src={arrowBack} alt='arrow back icon'></img>
                            </button>
                        </Link>
                        <h1 className='warehouse-details-page__header'>{warehouseData.name}</h1>
                    </div>
                    <Link to={`/warehouse/edit/${id}`}>
                        <button className='warehouse-details-page__edit-button'>
                            <img className='warehouse-details-page__edit-icon' src={edit} alt='edit icon'></img>
                        </button>
                    </Link>
                </div>
                <div className='warehouse-details-page__warehouse-details'> 
                    <h3 className='warehouse-details-page__warehouse-address-header'>WAREHOUSE ADDRESS:</h3>
                    <p className='warehouse-details-page__warehouse-address'>{warehouseData.address}, {warehouseData.city}, {warehouseData.country}</p>
                    <div className='warehouse-details-page__contact-parent-container'> 
                        <div className='warehouse-details-page__contact-name-container'>
                            <h3 className='warehouse-details-page__contact-name-header'>CONTACT NAME:</h3>
                            <p className='warehouse-details-page__contact-name'>{warehouseData.contact.name}</p>
                            <p className='warehouse-details-page__contact-position'>{warehouseData.contact.position}</p>
                        </div>
                        <div className='warehouse-details-page__contact-info-container'>
                            <h3 className='warehouse-details-page__contact-info-header'>CONTACT INFORMATION:</h3>
                            <p className='warehouse-details-page__contact-phone'>{warehouseData.contact.phone}</p>
                            <p className='warehouse-details-page__contact-email'>{warehouseData.contact.email}</p>
                        </div>
                    </div>
                </div>
                {inventoryData && <MobileWarehouseInventoryCard inventoryData={inventoryData} getInventoryOfWarehouse={getInventoryOfWarehouse} warehouseId={id} />}
            </section>}
        </main>
    )
}

export default WarehouseDetailsPage;