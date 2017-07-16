import React from 'react';

export default function (props) {
    const styles = require('./Navigation.sass');

    return (
        <nav className="navbar navbar-light navbar-toggleable-sm bg-faded">
            <div className="container">
                <a className="navbar-brand navigation-brand" href="#" >
                    <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top"/>
                    <sub>jasclib</sub><strong>Shower</strong><sup>dev</sup>
                </a>
            </div>
        </nav>
    );
}