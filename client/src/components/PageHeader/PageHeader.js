import './PageHeader.scss';
import logo from '../../assets/logos/InStock-Logo.png';
import { Link } from 'react-router-dom';

function PageHeader() {

    return (
        <header className="header">
            <button className='header__instock-button'>
                <img className='header__instock-image' src={logo} alt="instock logo"></img>
            </button>
            <nav className='header__nav'>
                <ul className='header__nav_list'>
                    <li className='header__nav-item'>
                        <Link className='header__nav-warehouse-link' to="/warehouse">Warehouses</Link>
                    </li>
                    <li className='header__nav-item'>
                        <Link className='header__nav-inventory-link' to="/inventory">Inventory</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default PageHeader;