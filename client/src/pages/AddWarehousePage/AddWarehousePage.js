import './AddWarehousePage.scss';
import { Link } from 'react-router-dom';
import arrowBack from '../../assets/icons/arrow_back.svg';
import AddWarehouseForm from '../../components/AddWarehouseForm/AddWarehouseForm';

function AddWarehousePage() {

    return (
        <main className='add-warehouse-page'>
            <section className='add-warehouse-page__content-container'>
                <div className='add-warehouse-page__header-content'>
                    <Link to={'/warehouse'} className='add-warehouse-page__arrow-back-link'>     
                        <button className='add-warehouse-page__arrow-back-button'>
                            <img className='add-warehouse-page__arrow-back-icon' src={arrowBack} alt='arrow back icon'></img>
                        </button>
                    </Link>
                    <h1 className='add-warehouse-page__header'>Add New Warehouse</h1>
                </div>
                <AddWarehouseForm />
            </section>
        </main>
    )
}

export default AddWarehousePage;