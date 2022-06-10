import React from 'react';
import NavComponent from './NavComponent';
import FormComponent from './FormComponent';

// Funkcional'nyj komponent
// Vse komponenty dolzhny nazyvatsa s Zaglavnoj bukvy, chtoby JSX ne putal jego s html
// Componenty v reacte tozhe samoe 4to i funkcqii v javasript
// component prinemajet argumenty kotorqje nazqvajutsa properties.
// Vse properties kotorqje bqli peredannq componentu hronjatsa v peremennoj 'props'
// U komponenta mogut bqtt propertis po umolchaniju
// Properties nelzja imzenitt v komponente
// JSX

export default function HeaderComponent(props) {
    // ... eto nazqvajut spreading v javascript.
    // spreading smotrit vse zna4enija v objekte i peredadjot kazhdqj po otdel'nosti.
    // props = { name: 'Rasim', surmane: 'Mehtijev' } = spreading = 
    // <FormCompoent name="Rasim" surname="Mehtiejv"
    return (
        <>
            <NavComponent />
            <FormComponent {...props} />
        </>
    )
}
// Properties po umol4aniju
// Properties po umol4aniju peredajutsa kak object.
// Properties = harakteristiki.
// Ispol'zujutsa tolko v tom slu4ii jesli pri ispolzovanii komponenta nebqli peredanny proprties 4erez atributy.
HeaderComponent.defaultProps = {
    firstName: "Anfrej",
    lastName: "Mehtijev",
  }
