import './WarehouseCard.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import trashcan from '../../assets/icons/delete_outline.svg';
import edit from '../../assets/icons/edit.svg';
import chevron from '../../assets/icons/chevron_right.svg';
import DeleteWarehouseModal from '../DeleteWarehouseModal/DeleteWarehouseModal';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function WarehouseCard({ warehouses, getWarehouses, search }) {
    const [warehouse, setWarehouse] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [filteredWarehouses, setFilteredWarehouses] = useState(warehouses);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_ENDPOINT}/warehouse/delete/${id}`);
            setDeleteModal(false);
            getWarehouses();
        } catch (error) {
            console.log(error);
        }
    }

    const openDeleteModal = (warehouse) => {
        setWarehouse(warehouse);
        setDeleteModal(true)
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    //When deleteModal is opened, .body overflow will be hidden to prevent background scrolling
    useEffect(() => {
        document.body.style.overflow = deleteModal ? "hidden" : "unset"
    }, [deleteModal])

    //Filter warehouses with search, otherwise use all warehouses data
    useEffect(() => {
        const filteredData = search ? warehouses.filter(warehouse => warehouse.name.toLowerCase().includes(search)) : warehouses;
        setFilteredWarehouses(filteredData);
    }, [search, warehouses])

    //This works, just not sure if useMemo is appropriate, since filtering isnt really a calculation. 
    //useMemo caches results of calculations between re-renders. useMemo can let use filter and avoid mutating data state
    //  const filtered = useMemo(() => {
    //     return warehouses.filter(warehouse => {
    //         return search.length > 0 ? warehouse.name.toLowerCase().includes(search) : true;
    //     })
    // }, [search, warehouses])

    return (
        <section>
            {filteredWarehouses.map((warehouse) => (
                <article key={warehouse.id} className='warehouse-card'>
                    <div className='warehouse-card__details-container'>  
                        <div className='warehouse-card__warehouse-details'>
                            <div className='warehouse-card__warehouse-section'>
                                <h3 className='warehouse-card__warehouse-header'>WAREHOUSE</h3>
                                <Link to={`/warehouse/${warehouse.id}`} className='link'> 
                                    <button className='warehouse-card__name-icon-button'>   
                                        <h3 className='warehouse-card__warehouse-name'>{warehouse.name}</h3>
                                        <img className='warehouse-card__warehouse-name-chevron' src={chevron} alt='chevron icon'/>
                                    </button>
                                </Link>
                            </div>
                            <div className='warehouse-card__address-info-section'>
                                <h3 className='warehouse-card__address-header'>ADDRESS</h3>
                                <p className='warehouse-card__address-street'>{warehouse.address},</p>
                                <p className='warehouse-card__address-city-country'>{warehouse.city}, {warehouse.country}</p>
                            </div>
                        </div>
                        <div className='warehouse-card__contact-details'>
                            <div className='warehouse-card__contact-name-section'>
                                <h3 className='warehouse-card__contact-header'>CONTACT NAME</h3>
                                <p className='warehouse-card__contact-name'>{warehouse.contact.name}</p>
                            </div>
                            <div className='warehouse-card__contact-info-section'>
                                <h3 className='warehouse-card__contact-info-header'>CONTACT INFORMATION</h3>
                                <p className='warehouse-card__contact-number'>{warehouse.contact.phone}</p>
                                <p className='warehouse-card__contact-email'>{warehouse.contact.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className='warehouse-card__delete-edit-container'>
                        <div className='warehouse-card__trashcan-container'>
                            <button onClick={() => openDeleteModal(warehouse)} className='warehouse-card__trashcan-button'>  
                                <img className='warehouse-card__trashcan' src={trashcan} alt='trashcan icon'/>
                            </button>
                        </div>
                        <div className='warehouse-card__edit-container'>
                            <Link to={`/warehouse/edit/${warehouse.id}`} className='link'> 
                                <button className='warehouse-card__edit-button'>  
                                    <img className='warehouse-card__edit' src={edit} alt='edit icon'/>
                                </button>
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
            {!filteredWarehouses.length && <div className='warehouse-card__not-found-container'>
                <h2 className='warehouse-card__not-found'>No Warehouse Found.</h2>
            </div>}
            {deleteModal && <DeleteWarehouseModal closeDeleteModal={closeDeleteModal} handleDelete={handleDelete} warehouse={warehouse}/>}
        </section>
    )
}

export default WarehouseCard;