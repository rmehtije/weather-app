import React from 'react';
import { Container } from 'react-bootstrap';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { google_api_key } from '../keys';
import cities from '../Header/cities.json';

const containerStyle = {
  height: '400px'
};

export default function MapComponent(props) {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: google_api_key
  });

  // {}.city = undefined Ne dajot oshybku
  // null.city = Oshqbka
  // undefined.city = Oshqbka
  return (
    <Container className="mt-3">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={cities[(props.cookie || {}).city || props.form.city]}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : <></>}
    </Container>
  )
}