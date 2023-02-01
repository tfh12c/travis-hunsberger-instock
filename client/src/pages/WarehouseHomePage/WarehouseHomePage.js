import './WarehouseHomePage.scss';

function WarehouseHomePage() {


    
    return (
        <main className='warehouse-home-page'>
            <section className='warehouse-home-page__content-container'>
                <h1 className='warehouse-home-page__header'>Warehouses</h1>
                <input className='warehouse-home-page__search-input' type="search" id="search" placeholder='Search...'></input>
                <button className='warehouse-home-page__add-warehouse-button'>+ Add New Warehouse</button>
            </section>
        </main>
    )
}

export default WarehouseHomePage;