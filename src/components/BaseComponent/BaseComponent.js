import React, {Component} from 'react';
import Output from '../Output';
import Chart from '../Chart';

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);

        this.input = null;
        this.data = null;
        this.processData = this.processData.bind(this);

    }

    processData() {
        this.data = null;

        try {
            this.data = this.input.value.split('\n');
            this.data = this.data.map(val => {
                const res = parseFloat(val);

                if (isNaN(res)) {
                    throw new Error('Invalid input');
                }

                return res;
            });

        } catch (e) {
            this.data = null;
        }

        this.forceUpdate();
    }

    render() {
        const bsStyles = require('bootstrap/dist/css/bootstrap.min.css');

        const inputStyle = [
            'col-sm-12',
            'col-md-3',
            'col-lg-2',
        ].join(' ');

        const outputStyle = [
            'col-sm-12',
            'col-md-9',
            'col-lg-10',
        ].join(' ');

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className={inputStyle}>
                        <h3>Input</h3>
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="input">Data</label>
                                <textarea className="form-control" id="input" rows="8" ref={comp => this.input = comp}>{[
                                    0.091,
                                    0.087,
                                    0.085,
                                    0.089,
                                    0.090,
                                    0.089,
                                    0.162,
                                    0.095,
                                    0.115,
                                    0.118,
                                    0.122,
                                    0.114,
                                    0.119,
                                    0.242,
                                    0.190,
                                    0.158,
                                    0.114,
                                    0.125,
                                    0.120,
                                    0.115,
                                    0.653,
                                    0.122,
                                    0.114,
                                    0.118,
                                    0.119,
                                    0.127,
                                    0.118,
                                    0.117,
                                    0.114,
                                    0.118,
                                    0.113,
                                    0.086,
                                    0.223,
                                    0.085,
                                    0.080,
                                    0.170,
                                    0.088,
                                    0.082,
                                    0.088,
                                    0.085,
                                    0.082,
                                    0.089,
                                    0.107,
                                    0.228,
                                    0.179,
                                    0.112,
                                    0.090,
                                    0.124,
                                    0.082,
                                    0.178,
                                ].join('\n')}</textarea>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={this.processData}>Show!</button>
                        </div>
                    </div>
                    <div className={outputStyle}>
                        <h3>Output</h3>
                        <Output data={this.data}/>
                    </div>
                </div>
            </div>
        );
    }
}
