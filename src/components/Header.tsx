import React from 'react';

function Header() {
    return (
        <header className="header">
            <div className="header__fixed-block">
                <button className="header__sign-up">SIGN UP</button>
                <button className="header__log-in">LOG IN</button>
            </div>
        </header>
    );
}

export default Header;
