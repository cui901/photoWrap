require('../css/main.scss');

import React from 'react';
import ReactDom from 'react-dom';
// console.log(React);

var arr = [
    <li>看到你就说明差不多好使了</li>,
    <li>然后就去睡觉！</li>
];

ReactDOM.render(
    <ul>
        {arr}
    </ul>, document.getElementById('app')
);
