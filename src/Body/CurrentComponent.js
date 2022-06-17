import React, { useState, useEffect } from 'react';
import DataComponent from './DataComponent';
import MapComponent from './MapComponent';
import { getCurrentWeather } from '../apiServices/weatherServices';
import { useParams } from 'react-router-dom';

export default function CurrentComponent(props) {

  const [ weather, setWeather ] = useState(null);

  // dlja togo 4toby polu4it parametry vbitqje v ssqlku posle ?
  // ispolzujet hook useParams.
  // kotorqj pri nali4ii parametra nazna4ajet peremennuju objectom s klju4jom i zna4enijem { city: 'Tallinn'}
  // useParams ne svjazan s state(sostojanijem) komponenta
  const params = useParams();

  const get = () => {
    const data = props.form || props.cookie;

    if(params.city) {
      data.city = params.city;
    }
    // getCurrentWeather vozvrashajet nam Promis
    // 4tobq obratotat otvet s promise my ispolzujem .then() v kotoruju propisqvajem callback funkcqju.
    // callback funkcqja prinemajet kak argument to 4to mq vernuli s async funkcqii return await response.json()
    // then zapuskajetsa kogda promise vernul pozitevnqj otvet (resolved)

    getCurrentWeather(data)
      .then((response) => {
        setWeather(response);
        console.log('response', response);
      })
      // catch chast async funkcqii kotoraja zapuskajetsa pri nali4ii oshqbki vo vsej strukture i pri (reject)
      // catch zapusttisa jesli v getCurrentWeather budet oshqbka i jesli budet .then oshqbka
      .catch((error) => {
        console.error('Error in api call', error);
      });
  }
  // useEffect mozhet sledit za izmenijami peremennyh kotorqje bqli peredannqje imu,
  // eto nazqvajut dependecy - zavisimost. ih mozhet byt neskolko. peredajom vvide massiva.
  // pri ljubqh izmeninij v zavisimostjah zapuskajetsa funkcqja vnutri useEffecta.
  useEffect(() => {
    if(props.form || props.cookie) {
      get();
    }
  }, [props.form, params]);
  

  return (
    <>
      <DataComponent {...props} weather={weather}/>
      {weather && (<MapComponent {...props} weather={weather}/>)}
    </>
  )
}