'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Input = require('./components/Form.jsx');
var Map = require('./components/Map.jsx');
var Props = require('./components/Props.jsx');
//ReactDOM.render(
//  <Input />,
//  document.getElementById('app')
//)
//

//ReactDOM.render(
//  <Map />,
//  document.getElementById('app')
//)

ReactDOM.render(
  <Props name='daben'/>,
  document.getElementById('app')
)
