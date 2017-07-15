import React, {Component} from 'react';
import Measure from 'react-measure';
import Output from './Output';
import Chart from './Chart';

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.data = [
            {id: 1, time: 0.2},
            {id: 2, time: 0.5},
            {id: 3, time: 0.3},
        ];
    }

    render() {
        const styles = require('./BaseComponent.sass');
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
                        <h4>Input</h4>
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="input">Data</label>
                                <textarea className="form-control" id="input" rows="8"/>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">Show!</button>
                        </div>
                    </div>
                    <div className={outputStyle}>
                        <h4>Output</h4>
                        <Output data={this.data}/>
                    </div>
                </div>
            </div>
        );

        return (
            <div className={styles.baseComponent}>
                <div className={styles['inputArea']}>
                    <h4>Input area here</h4>
                    <textarea />
                </div>
                <div className={styles['outputArea']}>
                    <h4>Output area here</h4>
                    <div id="chartsContainer" className="col-l">
                        <Chart data={this.data}/>
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