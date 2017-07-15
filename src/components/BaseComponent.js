import React, {Component} from 'react';
import Output from './Output';
import Chart from './Chart';

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
                                <textarea className="form-control" id="input" rows="8" ref={comp => this.input = comp}/>
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

/*
<div className="row">
    <div className="col-sm-12">
        <div style={{background: 'red'}}>Div</div>
        {/*<Chart data={this.data}/>* /}
        {/*
         <div className="form-inline">
         <div className="form-check">
         <label className="form-check-label">
         <input className="form-check-input" type="checkbox" /> Show avg
         </label>
         </div>
         <div className="form-check">
         <label className="form-check-label">
         <input className="form-check-input" type="checkbox" /> Show median
         </label>
         </div>
         </div>
         /** /}
    </div>
</div>
//*/