import React, {Component} from 'react';

import Navigation from '../Navigation/Navigation';
import StyledChart from '../StyledChart';
import Input from "../Input/Input";
import TextOutput from "../Outputs/TextOutput";
import ChartOutput from "../Outputs/ChartOutput";

export default class Prototype extends Component {
    render() {
        const bsStyles = require('bootstrap/dist/css/bootstrap.min.css');
        const styles = require('./Prototype.sass');

        return (
            <div>
                <Navigation/>

                <div className="container">
                    <div className="row">
                        <Input/>
                        <TextOutput/>
                    </div>
                    <div className="row">
                        <ChartOutput/>
                    </div>
                </div>
            </div>
        );
    }
}
