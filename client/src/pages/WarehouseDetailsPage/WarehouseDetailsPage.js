import './WarehouseDetailsPage.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function WarehouseDetailsPage() {
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
            console.log(data);
            setLoading(false);
            setError(null);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError('Could not fetch data.');
        }
    }

    // Runs when component mounts
    useEffect(() => {
        getWarehouseById(id);
    }, [])

    return (
        <div>WarehouseDetailsPage</div>
    )
}

export default WarehouseDetailsPage;