import './WarehouseDetailsPage.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

    //GET inventory of warehouse by ID
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
    }, [])

    console.log(warehouseData);
    console.log(inventoryData); 

    return (
        <div>WarehouseDetailsPage</div>
    )
}

export default WarehouseDetailsPage;