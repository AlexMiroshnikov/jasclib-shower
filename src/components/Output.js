import React, {Component} from 'react';
import Measure from 'react-measure';
import Chart from './Chart';

export default class Output extends Component {

    constructor(props) {
        super(props);

        this.state = {
            height: null,
            width: null,
        };

        this.onMeasure = this.onMeasure.bind(this);
    }

    componentWillReceiveProps() {
        if (!this.props.data) {
            this.setState({height: null});
        }
    }

    onMeasure(input) {
        this.setState({
            height: Math.floor(input.height),
            width: Math.floor(input.width),
        });
    }

    render() {
        if (!this.props.data) {
            return <div className="alert alert-info">Provide input data</div>;
        }

        return (
            <div className="row" style={{background: '#f3f3f3', height: (this.state.height || '100%'), minHeight: '480px'}}>
                <div className="col-md-2">
                    Settings are here
                </div>
                <Measure onMeasure={this.onMeasure}>
                    <div className="col">
                        {this.state.height ?
                            <Chart
                                data={this.props.data}
                                height={this.state.height}
                                width={this.state.width}
                                noAxisX
                                /*valueExtractor={item => item.time}*/
                            />
                            : null
                        }
                    </div>
                </Measure>
            </div>
        );
    }
}