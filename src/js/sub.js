require('../css/main.scss');
var React = require('react');
var ReactDOM = require('react-dom');

console.log(React);

var arr = [
  <h2>看到你就说明差不多好使了</h2>,
  <h2>然后就去睡觉！</h2>
];

ReactDOM.render(
    <div>
      {arr}
    </div>, document.getElementById('app')
);
