import './PageHeader.scss';
import logo from '../../assets/logos/InStock-Logo.svg';
import { Link, NavLink } from 'react-router-dom';

function PageHeader() {

    return (
        <header className="header">
            <Link className='header__instock-link' to="/">
                <img className='header__instock-image' src={logo} alt="instock logo"></img>
            </Link>
            <nav className='header__nav'>
                <ul className='header__nav-list'>
                    <li className='header__nav-item'>
                        <NavLink className='header__nav-link' to="/warehouse">Warehouses</NavLink>
                    </li>
                    <li className='header__nav-item'>
                        <NavLink className='header__nav-link' to="/inventory">Inventory</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default PageHeader;