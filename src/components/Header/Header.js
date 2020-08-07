import React from 'react';
import './header.css';
import headerImage from './group-3.png';

class Header extends React.Component {
    render() {
        return (
            <header className="Group-3">
                <img src={headerImage} alt="headerImage"/>
            </header>)
    }
}

export default Header;
