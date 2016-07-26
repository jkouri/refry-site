import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/MainPage';

const tree = (
  <MainPage />
);

window.onload = () => {
  ReactDOM.render(tree, document.getElementById('mount'));
};
