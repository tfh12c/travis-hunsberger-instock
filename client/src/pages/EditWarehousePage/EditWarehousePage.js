import './EditWarehousePage.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import arrowBack from '../../assets/icons/arrow_back.svg';
import EditWarehouseForm from '../../components/EditWarehouseForm/EditWarehouseForm';

function EditWarehousePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    //GET warehouse by ID
    const getWarehouseById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/warehouse/${id}`);
            setData(response.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError('Could not fetch warehouse data.');
        }
    }

    //Runs when component mounts
    useEffect(() => {
        getWarehouseById(id);
    }, [id])

    console.log(data);

    return (
        <main className='edit-warehouse-page'>
            <section className='edit-warehouse-page__content-container'>
                <div className='edit-warehouse-page__header-content'>
                    <button className='edit-warehouse-page__arrow-back-button'>
                        <img className='edit-warehouse-page__arrow-back-icon' src={arrowBack} alt='arrow back icon'></img>
                    </button>
                    <h1 className='edit-warehouse-page__header'>Edit Warehouse</h1>
                </div>
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                {data && <EditWarehouseForm warehouse={data} />}
            </section>
        </main>
    )
}

export default EditWarehousePage;