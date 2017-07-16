import React, {Component} from 'react';

import Navigation from '../Navigation/Navigation';
import Input from "../Input/Input";
import TextOutput from "../Outputs/TextOutput";
import ChartOutput from "../Outputs/ChartOutput";
import Research from '../../utils/Research';

export default class Prototype extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
        };

        this.refInput = comp => {
            console.log('comp');
            console.log(comp);
        };

        this.onSubmit = sanitizedInput => {
            let result = null;

            try {
                result = new Research(sanitizedInput);
            } catch (e) {
                window.alert(e);
            }

            this.setState({result});
        };
    }

    render() {
        const bsStyles = require('bootstrap/dist/css/bootstrap.min.css');
        const styles = require('./Prototype.sass');

        return (
            <div>
                <Navigation/>

                <div className="container">
                    <div className="row">
                        <Input ref={this.refInput} onSubmit={this.onSubmit}/>
                        <TextOutput result={this.state.result}/>
                    </div>
                    <div className="row">
                        <ChartOutput result={this.state.result}/>
                    </div>
                </div>
            </div>
        );
    }
}
