import './MobileWarehouseCard.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import trashcan from '../../assets/icons/delete_outline.svg';
import edit from '../../assets/icons/edit.svg';
import chevron from '../../assets/icons/chevron_right.svg';
import DeleteWarehouseModal from '../DeleteWarehouseModal/DeleteWarehouseModal';

function MobileWarehouseCard({ warehouses, getWarehouses, search }) {
    const [warehouse, setWarehouse] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [filteredWarehouses, setFilteredWarehouses] = useState(warehouses);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/warehouse/delete/${id}`);
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
        <>
            {filteredWarehouses.map((warehouse) => (
                <article key={warehouse.id} className='mobile-warehouse-card'>
                    <div className='mobile-warehouse-card__details-container'>  
                        <div className='mobile-warehouse-card__warehouse-details'>
                            <h4 className='mobile-warehouse-card__warehouse-header'>WAREHOUSE</h4>
                            <Link to={`/warehouse/${warehouse.id}`} className='link'> 
                                <button className='mobile-warehouse-card__name-icon-button'>   
                                    <p className='mobile-warehouse-card__warehouse-name'>{warehouse.name}</p>
                                    <img className='mobile-warehouse-card__warehouse-name-chevron' src={chevron} alt='chevron icon'/>
                                </button>
                            </Link>
                            <h4 className='mobile-warehouse-card__address-header'>ADDRESS</h4>
                            <p className='mobile-warehouse-card__address-street'>{warehouse.address},</p>
                            <p className='mobile-warehouse-card__address-city-country'>{warehouse.city}, {warehouse.country}</p>
                            <button onClick={() => openDeleteModal(warehouse)} className='mobile-warehouse-card__trashcan-button'>  
                                <img className='mobile-warehouse-card__trashcan' src={trashcan} alt='trashcan icon'/>
                            </button>
                        </div>
                        <div className='mobile-warehouse-card__contact-details'>
                            <h4 className='mobile-warehouse-card__contact-header'>CONTACT NAME</h4>
                            <p className='mobile-warehouse-card__contact-name'>{warehouse.contact.name}</p>
                            <h4 className='mobile-warehouse-card__contact-info-header'>CONTACT INFORMATION</h4>
                            <p className='mobile-warehouse-card__contact-number'>{warehouse.contact.phone}</p>
                            <p className='mobile-warehouse-card__contact-email'>{warehouse.contact.email}</p>
                            <Link to={`/warehouse/edit/${warehouse.id}`} className='link'> 
                                <button className='mobile-warehouse-card__edit-button'>  
                                    <img className='mobile-warehouse-card__edit' src={edit} alt='edit icon'/>
                                </button>
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
            {/* {!filtered.length && <div className='mobile-warehouse-card__not-found-container'>
                <h2 className='mobile-warehouse-card__not-found'>No Warehouse Found.</h2>
            </div>} */}
            {deleteModal && <DeleteWarehouseModal closeDeleteModal={closeDeleteModal} handleDelete={handleDelete} warehouse={warehouse}/>}
        </>
    )
}

export default MobileWarehouseCard;