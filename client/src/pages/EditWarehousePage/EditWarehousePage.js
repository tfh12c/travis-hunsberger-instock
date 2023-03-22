import './EditWarehousePage.scss';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import arrowBack from '../../assets/icons/arrow_back.svg';
import EditWarehouseForm from '../../components/EditWarehouseForm/EditWarehouseForm';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function EditWarehousePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    //GET warehouse by ID
    const getWarehouseById = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_ENDPOINT}/warehouse/${id}`);
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

    return (
        <main className='edit-warehouse-page'>
            <section className='edit-warehouse-page__content-container'>
                <div className='edit-warehouse-page__header-content'>
                    <Link to={`/warehouse/${id}`} className='edit-warehouse-page__arrow-back-link'>
                        <button className='edit-warehouse-page__arrow-back-button'>
                            <img className='edit-warehouse-page__arrow-back-icon' src={arrowBack} alt='arrow back icon'></img>
                        </button>
                    </Link>
                    <h1 className='edit-warehouse-page__header'>Edit Warehouse</h1>
                </div>
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                {data && <EditWarehouseForm warehouse={data} id={id} />}
            </section>
        </main>
    )
}

export default EditWarehousePage;