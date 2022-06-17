import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderComponent from './Header/HeaderComponent';
import dataTypes from './Header/type.json';
import { useCookies } from 'react-cookie';
import CurrentComponent from './Body/CurrentComponent';
import ForecastComponent from './Body/ForecastComponent';
import { Routes, Route } from 'react-router-dom';

function App() {

  const [form, setForm] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(['weather']);

  console.log(cookies.weather);

  function handleOnSubmit(event) {

    event.preventDefault();

    const city = event.target.city.value;
    const unit = event.target.unit.value;
    let selectedTypes = [];

    for (const dtype of event.target.dataType) {
      if (dtype.checked === true) {
        selectedTypes.push(dtype.value);
      }
    }

    let excludeDataType = dataTypes.filter(dtype => !selectedTypes.includes(dtype.value));
    const language = event.target.language.value;
    const updateData = {
      city,
      unit,
      language,
      excludeDataType,
    };
    setForm(updateData);

    setCookie('weather', updateData);
  }
  // My ostavili HeaderComponent statichnqm pri izmenenii ssqlki
  return (
    <Container>
      <Row>
        <Col>
          <HeaderComponent
            firstName="Rasim"
            handleOnSubmitForm={handleOnSubmit}
            setForm={setForm}
            form={form}
            setCookie={setCookie}
            cookie={cookies.weather}
          />
        </Col>
      </Row>
      <Row>
        <Col>
        {/* Vnutri komponenta Routes my propisqvajem nashy ssqlki
          Kazhdaja ssqlka eto Route komponent kotorqj zapuskajetsa pri zahode na ssqlku opredeljonnoj v path
          v element propisqvajetsa tot komponenet kotorqj dolzhen obrabotatsa.
          4tobq peredat' ljuboj parametr v komponent v Route path pishetsa :(nazvanije peremennyj)
          :city = Tallinn
        */}
          <Routes>
            <Route path="/" element={<CurrentComponent form={form} cookie={cookies.weather} />} />
            <Route path="/current/:city" element={<CurrentComponent form={form} cookie={cookies.weather} />} />
            <Route path="/forecast" element={<ForecastComponent form={form} cookie={cookies.weather} />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
