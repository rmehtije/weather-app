import React, {useRef, useEffect} from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import cities from './cities.json';
import dataTypes from './type.json';

export default function FormComponent(props) {
// useRef в основном как способ получить доступ к DOM.
// 4toby nazna4it s kakoj element my budem ssylatsa my ispol'zujem atrib ref={} v html
// My poluchajem vsjo derevo DOM v objecte current. formElement.current
  const formElement = useRef(null);

  // useEffect po bolshe stepeni ispolzujetsa dlja raboty s DOM
  // useEffect zapuskajetsa posle togo kak render componenta zakon4ilsa
  // useEffent na sam component - on ne zapuskajet render ili rerender.
  useEffect(() => {
    if(props.form === null) {
      props.setForm({
        city: props.selectedCity,
        unit: props.unit,
        language: props.language,
      });
    }
  });

  // onInput zapuskajetsa pri vvedenija dannqh ot pol'zovatelja. v input html teg.
  // tol'ko v Form i input teg.
  function OnInput () {
    // Funkcqja kotoraja berjot nashu ssylku na element (Form) DOM, i nazna4ajet jemu novoe Sobytije
    // Eto novoje sobytije zapuskajet Submit funkciju Formi.
    formElement.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  }

  // onInput i onSubmit = События HTML — это «вещи» , которые происходят с элементами HTML.
  // sobitija ishodjat iz brauzera i iz po'zovatelja.
  // u sobitija dolzhen bqt obrabot4ik - javascript funkcqija
  // sobitije peredjot obrabot4iku 1. dom strukturu elemnta na kotorym visit sobytije.
  // event.target

  // Form ispolzujetsa dlja polu4enija dannqh ot pol'zovatelja i poslat ih na server dlja obrabotki
  // Form dlja etogo ispolzujet dva glanvqh protokola POST i GET
  // POST - vosnovnom ispo'zujetsa dlja otpravki dannqh
  // GET - dlja polu4enija
  // Po umol4aniju on otpravljajet dannqje 4erez method POST
  // A jesli mq hotim izmenit my propisqvajem otribut method="GET"
  // v Forme ispolzujutsa input tegi dlja sbora dannqh

  // V Reacte kazhdqj elemnt dolzhqn bqt unikalnqm. Eto nuzhno dlja otslezhevanija ljubqh izmenenij 
  // v componente i tem samqm renderit tol'ko to 4to neobhodimo.
  return (
    <Container>
      <Form method="GET" ref={formElement} onInput={OnInput} onSubmit={props.handleOnSubmitForm}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>Choose city</Form.Label>
              <Form.Select defaultValue={(props.cookie || {}).city || props.selectedCity} name="city" aria-label="Default select example">
                <option>Open this select menu</option>
                {cities.map((city, i) =>
                  <option value={i} key={city.name}>{city.name}</option>
                )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="language">
              <Form.Label>Choose language</Form.Label>
              <Form.Select defaultValue={(props.cookie || {}).language || props.language} name="language" aria-label="Default select example">
                <option>Choose language</option>
                {['en', 'fi', 'ru'].map(language =>
                  <option key={language}>{language}</option>
                )}
              </Form.Select>
            </Form.Group>

          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="unit">
              <Form.Label>Choose unit</Form.Label>
              {['standard', 'metric', 'imperial'].map(unit => {
                let isChecked = props.unit === unit;
                if((props.cookie || {}).unit) {
                  isChecked = props.cookie.unit === unit;
                }

                return (<Form.Check
                  key={unit}
                  id={unit}
                  name="unit"
                  type='radio'
                  defaultChecked={isChecked}
                  label={unit}
                  value={unit}
                />)
              }
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="dataType">
              <Form.Label>Choose Data type</Form.Label>
              {dataTypes.map(dtype => {
                let isSelected = props.dataType.value === dtype.value;

                if((props.cookie || {}).excludeDataType) {
                  let exclude = props.cookie.excludeDataType.find(type => type.value === dtype.value);
                  if(exclude) {
                    isSelected = false;
                  } else {
                    isSelected = true;
                  }
                }

                return (<Form.Check
                  key={dtype.value}
                  id={dtype.value}
                  type="checkbox"
                  name="dataType"
                  defaultChecked={isSelected}
                  label={dtype.label}
                  value={dtype.value}
                />)
              }
                
              )}
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

FormComponent.defaultProps = {
  selectedCity: 0,
  language: "en",
  dataType: dataTypes.find(type => type.label === 'Daily'),
  unit: "metric",
}