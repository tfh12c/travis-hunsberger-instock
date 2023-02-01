import './WarehouseHomePage.scss';
import { useAxios } from '../../hooks/useAxios';
import MobileWarehouseCard from '../../components/MobileWarehouseCard/MobileWarehouseCard';

function WarehouseHomePage() {
    const { data, loading, error } = useAxios('http://localhost:4000/warehouse/');
    console.log(data);
    
    return (
        <main className='warehouse-home-page'>
            <section className='warehouse-home-page__content-container'>
                <div className='warehouse-home-page__header-content'>  
                    <h1 className='warehouse-home-page__header'>Warehouses</h1>
                    <input className='warehouse-home-page__search-input' type="search" id="search" placeholder='Search...'></input>
                    <button className='warehouse-home-page__add-warehouse-button'>+ Add New Warehouse</button>
                </div>
                {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                {data && <MobileWarehouseCard warehouses={data} />}
            </section>
        </main>
    )
}

export default WarehouseHomePage;