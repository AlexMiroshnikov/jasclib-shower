import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StyledChart from "../StyledChart";

export default class ChartOutput extends Component {

    static propTypes = {
        result: PropTypes.shape({
            data: PropTypes.func.isRequired,
        }).isRequired,
    };

    render() {
        const {result} = this.props;

        return (
            <div className="col">
                <h3>Chart representation</h3>
                {result ?
                    <StyledChart
                        data={[15, 30, 25, 50]}
                        height={480}
                        width={640}
                        noAxisX={true}
                    />
                    :
                    <div className="alert alert-warning">Nothing to display</div>
                }
            </div>
        );
    }
}
