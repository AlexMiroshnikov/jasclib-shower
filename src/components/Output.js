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

    onMeasure(input) {
        this.setState({
            height: Math.floor(input.height),
            width: Math.floor(input.width),
        });
    }

    render() {
        return (
            <Measure onMeasure={this.onMeasure}>
                <div className="row" style={{background: '#f3f3f3', height: '100%', minHeight: '278px'}}>
                    <div className="col-md-2">
                        Settings are here
                    </div>
                    <div className="col">
                        {function(_this){
                            try {
                                if (!_this.state.height) {
                                    return null;
                                }

                                const chart = <Chart
                                    data={_this.props.data}
                                    height={_this.state.height}
                                    width={_this.state.width}
                                    valueExtractor={item => item.time}
                                />;

                                return chart;
                            } catch (e) {
                                return <div className="alert alert-danger">{'' + e}</div>
                            }
                        }(this)}
                    </div>
                </div>
            </Measure>
        );
    }
}