import './WarehouseHomePageSortBar.scss';
import sortIcon from '../../assets/icons/sort.svg';

function WarehouseHomePageSortBar({ sort, sortWarehouse, sortAddress, sortContactName, sortContactInfo }) {

    return (
        <div className='warehouse-home-page-sort-bar__sort-buttons-container'>
            <button className='warehouse-home-page-sort-bar__sort' onClick={sortWarehouse}>
                <h4 className='warehouse-home-page-sort-bar__warehouse-sort-header'>WAREHOUSE</h4>
                <img className={sort === 'warehouse' ? 'warehouse-home-page-sort-bar__sort-icon--active' : ''} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='warehouse-home-page-sort-bar__sort' onClick={sortAddress}>
                <h4 className='warehouse-home-page-sort-bar__address-sort-header'>ADDRESS</h4>
                <img className={sort === 'address' ? 'warehouse-home-page-sort-bar__sort-icon--active' : ''} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='warehouse-home-page-sort-bar__sort' onClick={sortContactName}>
                <h4 className='warehouse-home-page-sort-bar__contact-name-sort-header'>CONTACT NAME</h4>
                <img className={sort === 'contactName' ? 'warehouse-home-page-sort-bar__sort-icon--active' : ''} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='warehouse-home-page-sort-bar__sort' onClick={sortContactInfo}>
                <h4 className='warehouse-home-page-sort-bar__contact-info-sort-header'>CONTACT INFORMATION</h4>
                <img className={sort === 'contactInfo' ? 'warehouse-home-page-sort-bar__sort-icon--active' : ''} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='warehouse-home-page-sort-bar__actions'>
                <h4 className='warehouse-home-page-sort-bar__actions-header'>ACTIONS</h4>
            </button>
        </div>
    )
}

export default WarehouseHomePageSortBar;