import './InventoryHomePageSortBar.scss';
import sortIcon from '../../assets/icons/sort.svg';

function InventoryHomePageSortBar({ sort, sortInventory, sortCategory, sortStatus, sortQuantity, sortWarehouse }) {

    return (
        <div className='inventory-home-page-sort-bar__sort-buttons-container'>
            <button className='inventory-home-page-sort-bar__sort' onClick={sortInventory}>
                <h4 className='inventory-home-page-sort-bar__warehouse-sort-header'>INV. ITEM</h4>
                <img className={sort === 'inventory' ? 'inventory-home-page-sort-bar__sort-icon--active' : ''} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='inventory-home-page-sort-bar__sort' onClick={sortCategory}>
                <h4 className='inventory-home-page-sort-bar__address-sort-header'>CATEGORY</h4>
                <img className={sort === 'category' ? 'inventory-home-page-sort-bar__sort-icon--active' : ''} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='inventory-home-page-sort-bar__sort' onClick={sortStatus}>
                <h4 className='inventory-home-page-sort-bar__contact-name-sort-header'>STATUS</h4>
                <img className={sort === 'status' ? 'inventory-home-page-sort-bar__sort-icon--active' : ''} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='inventory-home-page-sort-bar__sort' onClick={sortQuantity}>
                <h4 className='inventory-home-page-sort-bar__contact-info-sort-header'>QTY</h4>
                <img className={sort === 'quantity' ? 'inventory-home-page-sort-bar__sort-icon--active' : ''} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='inventory-home-page-sort-bar__sort' onClick={sortWarehouse}>
                <h4 className='inventory-home-page-sort-bar__contact-info-sort-header'>WAREHOUSE</h4>
                <img className={sort === 'warehouse' ? 'inventory-home-page-sort-bar__sort-icon--active' : ''} src={sortIcon} alt='sort icon'></img>
            </button>
            <button className='inventory-home-page-sort-bar__actions'>
                <h4 className='inventory-home-page-sort-bar__actions-header'>ACTIONS</h4>
            </button>
        </div>
    )
}

export default InventoryHomePageSortBar;