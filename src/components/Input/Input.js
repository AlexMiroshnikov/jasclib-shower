import React, {Component} from 'react';

export default class Input extends Component {
    render() {
        const styles = require('./Input.sass');
        const disabled = true;
        const btnClassName = [
            'btn',
            'btn-lg',
            'btn-block',
            disabled ? 'btn-disabled' : 'btn-primary',
        ].join(' ');

        return (
            <div className="col-md-3 col-sm-12 input">
                <h3>Input</h3>
                <div className="form">
                    <div className="form-group">
                        <textarea className="form-control" rows="8"/>
                    </div>
                    <button type="submit" className={btnClassName} disabled={disabled}>Show</button>
                </div>
            </div>
        );
    }
}
