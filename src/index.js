import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
// BrowserRouter - gljavnqj komponent react router kotorqj dolzhen obernut vsjo nashe prilozhenije
// tak mq govorim reaktu chto my ispolzujem sdess url marshutq
// React router pomogajet nam rabotat s stranicami. Pri zahode na ssylku on obrabatqvajet i renderit tolko nuzhnqje kompanenty.
// Blagodorja etomu u nas ne proishodit perezgruzki celoj stranicy a tolko lish ta 4ast kotoruju my opredelim
// 
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
