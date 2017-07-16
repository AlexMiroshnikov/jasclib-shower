import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {

    static propTypes = {
        parse: PropTypes.func,
        onSubmit: PropTypes.func.isRequired,
    };

    static defaultProps = {
        parse: rawInput => {
            let vals = rawInput.split('\n');
            vals = vals.map(val => val.replace(/^[ \s\t\r\n]*(.*)[ \s\t\r\n]*$/, '$1'));
            // vals = vals.map(val
            // => parseFloat(val));
            // vals = vals.filter(val => !isNaN(val));
            vals = vals.filter(val => val !== '');
            return vals;
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            rawInput: null,
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputChange(e) {
        this.setState({
            rawInput: e.target.value,
        });
    }

    onSubmit() {
        return this.props.onSubmit(this.props.parse(this.state.rawInput));
    }

    render() {
        const styles = require('./Input.sass');
        const disabled = !this.state.rawInput;
        const btnClassName = [
            'btn',
            'btn-lg',
            'btn-block',
            disabled ? 'btn-disabled' : 'btn-primary',
        ].join(' ');

        return (
            <div className="col-md-3 col-sm-12 input mt">
                <h3>Input</h3>
                <div className="form">
                    <div className="form-group">
                        <textarea className="form-control" rows="8" onChange={this.onInputChange}/>
                    </div>
                    <button type="submit" className={btnClassName} disabled={disabled} onClick={this.onSubmit}>Show</button>
                </div>
            </div>
        );
    }
}
