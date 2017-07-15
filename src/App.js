import React, {Component} from 'react';

import BaseComponent from './components/BaseComponent';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>I am the App</h1>
                <BaseComponent/>
                <div>Eof of App</div>
            </div>
        );
    }
}