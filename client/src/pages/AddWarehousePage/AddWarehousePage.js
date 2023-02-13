import './AddWarehousePage.scss';
import arrowBack from '../../assets/icons/arrow_back.svg';

function AddWarehousePage() {

    return (
        <main className='add-warehouse-page'>
            <section className='add-warehouse-page__content-container'>
                <div className='add-warehouse-page__header-content'>
                    <button className='add-warehouse-page__arrow-back-button'>
                        <img className='add-warehouse-page__arrow-back-icon' src={arrowBack} alt='arrow back icon'></img>
                    </button>
                    <h2 className='add-warehouse-page__header'>Add New Warehouse</h2>
                </div>
                {/* {error && <p>{error}</p>}
                {loading && <p>Loading...</p>}
                {data && <addWarehouseForm warehouse={data} id={id} />} */}
            </section>
        </main>
    )
}

export default AddWarehousePage;