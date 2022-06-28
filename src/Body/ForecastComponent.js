import React, { useState, useEffect } from 'react';
import DataComponent from './DataComponent';
import MapComponent from './MapComponent';
import { getForecastWeather } from '../apiServices/weatherServices';
import { Tabs, Tab } from 'react-bootstrap';
import moment from 'moment';

export default function ForecastComponent(props) {

  const [days, setDays] = useState([]);
  const [weather, setWeather] = useState(null);

  const get = () => {
    getForecastWeather(props.form || props.cookie)
      .then((response) => {
        console.log(response);
        setWeather(response);
        let oneDay = [];
        const dataByDays = [];

        for (const [index, data] of response.list.entries()) {

          data.dt = data.dt + response.city.timezone;
          const dayOfDate = moment.unix(data.dt).utc().date(); // 22
          const prevDayOfDate = oneDay.length ? moment.unix(oneDay[oneDay.length - 1].dt).utc().date() : dayOfDate; // {ljuboe 4islo} || 22

          if(dayOfDate === prevDayOfDate) {
            oneDay.push(data);
          } else {
            dataByDays.push(oneDay);
            oneDay = [];
            oneDay.push(data);
          }

          // if ((index + 1) % 8 === 0) {
          //   dataByDays.push(oneDay);
          //   oneDay = [];

          // }
        }

        setDays(dataByDays);
        console.log(dataByDays);
      })
      .catch((error) => {
        console.error('Error in api call', error);
      });
  }

  useEffect(() => {
    if (props.form || props.cookie) {
      get();
    }
  }, [props.form, props.cookie]);

  // moment.unix(day[0].dt).date()
  return (
    <>
      <Tabs className="mb-3 mt-2">
        {days.map((day, index1) => (
          <Tab eventKey={index1} key={index1} title={"Day " + moment.unix(day[0].dt).utc().date()}>
            <Tabs className="mb-3 mt-2">
              {day.map((data, index2) => (
                <Tab eventKey={index2} key={index2} title={moment.unix(data.dt).utc().format('HH:mm')}>
                  <DataComponent {...props} weather={data}/>
                </Tab>
              ))}
            </Tabs>
          </Tab>
        ))}
      </Tabs>
      {days.length && (<MapComponent {...props} weather={weather.city}/>)}
    </>
  )
}