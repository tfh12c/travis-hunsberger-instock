import './WarehouseDetailsPageSortBar.scss';
import sortIcon from '../../assets/icons/sort.svg';

function WarehouseDetailsPageSortBar({ sort, sortInventory, sortCategory, sortStatus, sortQuantity }) {

    return (
        <div className='warehouse-details-page-sort-bar__sort-buttons-container'>
            <button className='warehouse-details-page-sort-bar__sort' onClick={sortInventory}>
                <h4 className='warehouse-details-page-sort-bar__warehouse-sort-header'>INVENTORY ITEM</h4>
                <img className={sort === 'inventory' ? 'warehouse-details-page-sort-bar__sort-icon--active' : 'inventory-home-page-sort-bar__sort-icon'} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='warehouse-details-page-sort-bar__sort' onClick={sortCategory}>
                <h4 className='warehouse-details-page-sort-bar__address-sort-header'>CATEGORY</h4>
                <img className={sort === 'category' ? 'warehouse-details-page-sort-bar__sort-icon--active' : 'inventory-home-page-sort-bar__sort-icon'} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='warehouse-details-page-sort-bar__sort' onClick={sortStatus}>
                <h4 className='warehouse-details-page-sort-bar__contact-name-sort-header'>STATUS</h4>
                <img className={sort === 'status' ? 'warehouse-details-page-sort-bar__sort-icon--active' : 'inventory-home-page-sort-bar__sort-icon'} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='warehouse-details-page-sort-bar__sort' onClick={sortQuantity}>
                <h4 className='warehouse-details-page-sort-bar__contact-info-sort-header'>QUANTITY</h4>
                <img className={sort === 'quantity' ? 'warehouse-details-page-sort-bar__sort-icon--active' : 'inventory-home-page-sort-bar__sort-icon'} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='warehouse-details-page-sort-bar__actions'>
                <h4 className='warehouse-details-page-sort-bar__actions-header'>ACTIONS</h4>
            </button>
        </div>
    )
}

export default WarehouseDetailsPageSortBar;