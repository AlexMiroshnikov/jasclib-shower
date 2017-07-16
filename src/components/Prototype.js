import React, {Component} from 'react';
import StyledChart from './StyledChart';

export default class Prototype extends Component {
    render() {
        const bsStyles = require('bootstrap/dist/css/bootstrap.min.css');
        const styles = require('./Prototype.sass');

        //https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg

        return (
            <div>
                <nav className="navbar navbar-light navbar-toggleable-sm bg-faded">
                    <div className="container">
                        {/*<h1 className="navbar-brand">*/}
                        <a className="navbar-brand" href="#">
                            <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top"/>
                            <sub style={{fontSize: '0.66em', marginLeft: '0.33em', marginRight: '0.2em'}}>jasclib</sub>
                            <strong style={{fontSize: '1.33em'}}>Shower</strong><sup style={{color: '#f38100', marginLeft: '0.1em'}}>dev</sup>
                        </a>
                        {/*</h1>*/}
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-12">
                            <h3>Input</h3>
                            <div className="form">
                                <div className="form-group">
                                    <textarea className="form-control" id="input" rows="8" style={{resize: 'none'}}/>
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary btn-block">Show</button>
                            </div>
                        </div>
                        <div className="col">
                            <h3>Output</h3>
                            <div className="row output">
                                <div className="col-xs-6 col-sm-6 col-md-3">
                                    <dt>mean</dt>
                                    <dd>123 <small>&plusmn; 48</small></dd>
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-2">
                                    <dt>median</dt>
                                    <dd className="output-median">456</dd>
                                </div>
                                <div className="col output-bounds">
                                    <dt>min / max</dt>
                                    <dd><span className="output-bounds-min">101</span> / <span className="output-bounds-max">587</span></dd>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>Chart is here</h3>
                            <StyledChart
                                data={[15,30,25,50]}
                                height={480}
                                width={640}
                                noAxisX={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
