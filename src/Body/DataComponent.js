import React from 'react';
import { Table } from 'react-bootstrap';
import { sentenceCase } from 'change-case';

export default function DataComponent(props) {

  // my mozhet peredat' react elemntu funkcqju kotoraja vernjot massiv a react uzhe sam jego obrabotajet
  function generateRows() {
    if(props.weather) {
      const tr = [];
      // for loop kotoraja berjot dannqje iz props weather. = otvetom s servera.
      // Object entries = predvaritelno opredljnnaja funkcqja javascript kotoraja rabotajet s objektami
      // ona nam vozvrashajet massive v kotorom lezhat dannqje objecta v vide massiva s dvumja elemntami
      // pervqj element eto klju4 ili nazvanije objecta a vtoroj jego zna4enije. 
      // { key1: 'value1', key2: 'value2', key2: 'value3' } = [ [ key1, value1 ], [ key2, value2 ], [ key3, value3 ] ]
      for (const [ key, value ] of Object.entries(props.weather.main)) {
        // .push funcqja dlja togo chtoby dobovljat elementy v massiv.
        tr.push(<tr key={key}>
            <td>{sentenceCase(key)}</td>
            <td>{value}</td>
          </tr>);
      }
      tr.push(<tr key="description">
        <td>Description</td>
        <td>{props.weather.weather[0].description}</td>
      </tr>);


      return tr;
    }
  }

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Data</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {generateRows()}

      </tbody>
    </Table>
  )
}
