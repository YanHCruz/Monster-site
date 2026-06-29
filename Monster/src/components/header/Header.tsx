import './Header.css';

import { Link } from 'react-router-dom';

export function Header() {
    return (
        
        <header className="cabecalho-principal">
            <div className="menu-central">
                <ul>
                    <li><a href="#">Energy Drinks</a></li>
                    <li><a href="#">Galeria</a></li>
                    <li><a href="#">Nossa história</a></li>
                    <li><a href="#">Contatos</a></li>
                </ul>
            </div>

            <div className="menu-icons">
                <a href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
                <Link to="/login" title="Acessar conta">
                    <i className="fa-solid fa-circle-user"></i>
                </Link>
                <a href="#"><i className="fa-solid fa-cart-arrow-down"></i></a>
            </div>
        </header>
    );
}