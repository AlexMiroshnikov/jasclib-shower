import React, {Component} from 'react';
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

        return (
            <div className={styles.baseComponent}>
                <div className={styles['inputArea']}>
                    <h4>Input area here</h4>
                    <textarea />
                </div>
                <div className={styles['outputArea']}>
                    <h4>Output area here</h4>
                    <div id="chartsContainer">
                        <Chart data={this.data}/>
                    </div>
                </div>
            </div>
        );
    }
}