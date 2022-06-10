import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderComponent from './Header/HeaderComponent';
import dataTypes from './Header/type.json';
import MapComponent from './Body/MapComponent';
import { useCookies } from 'react-cookie';

function App() {// Glanvyj reacta kotoryj renderitsa v <div id="root">

  const [ form, setForm ] = useState(null); 
  // Eto huk kotorqyj otve4ajet za sostajanija kompanenta.
  // Vse huki v reakte na4inajutsa s slovom 'use'
  // useState vozvrashjajet massiv s dvumja elemntami: 1 текущее значение состояния и 2. функцию для его обновления.
  // pri obnovlenii sostajanija u nas proisodit rerender Componenta.
  // useState kak mnogije huki prinemajut parametry - zna4enije na4alnogo sostojanija
  const [cookies, setCookie, removeCookie] = useCookies(['weather']);
  // eto huk s dopolnitel'nogo paketa npm react-cookie
  // useCookie massive s nazvanijami budushih coockie. 
  // vozvrashjajet massive s 3 elemntami: 1. objekt: cookie = {weather: null}; 2. funkcija kotoraja nazna4ajet i sozdajot nash cookie, 3. funkcqja kotoraja udoljajet nash cookie
  // useCookie ne obnovljajet (render) component
  
  console.log(cookies.weather);
  // Dlja vyvedenija informacqii v console developer tools.
  
  // Obrabot4ik submit sobqtija
  function handleOnSubmit(event) {
    // zapreshajem jemu dejstvovat po umol4aniju
    event.preventDefault();
    // Polu4ajem informacqju ot pol'zovatelja.
    // to 4to on vpisal v input
    // event.target.city.value = {sobytije}.{dannqjDOM}.{Imja input tega}.{Jego zna4enije}
    const city = event.target.city.value;
    const unit = event.target.unit.value;
    let selectedTypes = [];
    
    for (const dtype of event.target.dataType) {
      if (dtype.checked === true) {
        selectedTypes.push(dtype.value);
      }
    }
    // filter kak forEach i map i for prohodit po vsemu massivu [] no ostavljajet tol'ko te nza4enije 
    // kotorqje nam nuzhnq
    // i on vernjot massive uzhe s nuzhnqm nam dannqmi

    // .includes prosto smotrit na massiv i ishet jest li v njom zna4enije polu4ennoje s argumenta
    // vozvrashajet true ili false
    let excludeDataType = dataTypes.filter(dtype => !selectedTypes.includes(dtype.value));
    const language = event.target.language.value;
    const updateData = {
      city,
      unit,
      language,
      excludeDataType,
    };
    // setForm - funkcqja kotaraja menjat state / sostajanije componenta i zatem proishodit rerender.
    setForm(updateData);
    // sozdajot cookie
    setCookie('weather', updateData);
  }

// Compoent vsegda dolzhen vozvrashat react element: JSX
// JSX: Javascript s html - kotoryj nam pomogajet sovmestit ih vmeste 
// Scipt kotoryj sovmeshajet javasctipt s html.
// JSX trebujet root elemnt. U nego dolzhen bqt odin glavnqj elemnt: html ili react komponent
// Dlja ukazanija javascript ispol'zujutsa figurnqje skobki.
// Properties peredajutsa v komponent 4erez html atributy
  return (
    <Container>
      <Row>
        <Col>
          <HeaderComponent 
            firstName="Rasim" 
            handleOnSubmitForm={handleOnSubmit} 
            setForm={setForm}
            form={form}
            cookie={cookies.weather}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <MapComponent form={form} cookie={cookies.weather}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
