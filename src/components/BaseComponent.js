import React, {Component} from 'react';

export default class BaseComponent extends Component {
    render() {
        const styles = require('./BaseComponent.sass');

        return (
            <div className={styles.baseComponent}>
                I am the base component
            </div>
        );
    }
}