import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import './app.css';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import Row from '../row/row';

import { PeoplePage } from '../pages'

import { SwapiServiceProvider } from '../swapi-service-context';

import {
    PersonList,
    PlanetList,
    StarshipList,
    PersonDetails,
    PlanetDetails,
    StarshipDetails
} from '../sw-components';



export default class App extends Component {



    state = {
        hasError: false,
        swapiService: new SwapiService()
    }

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
            console.log("Service Changed to", Service.name);
            return {
                swapiService: new Service()
            }
        })
    }

    componentDidCatch() {
        console.log('componentDidCatch()');
        this.setState({ hasError: true });
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.state.swapiService;


        // old code
        const personDetails = (
            <ItemDetails
                itemId={11}
                getImageUrl={getPersonImage}
                getData={getPerson}>

                <Record field="gender" label="Gender" />
                <Record field="eyeColor" label="Eye Color" />

            </ItemDetails>
        )

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getImageUrl={getStarshipImage}
                getData={getStarship}>

                <Record field="model" label="Model" />
                <Record field="length" label="Length" />
                <Record field="costInCredits" label="Cost" />

            </ItemDetails>
        )

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange} />
                        <RandomPlanet />
                        <PeoplePage />



                        {/* <RandomPlanet />
                <ErrorButton /> */}

                        {/* <PeoplePage /> */}

                        {/* <Row
                    left={personDetails}
                    right={starshipDetails} />

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllPlanets}
                            renderItem={({ name, diameter }) => `${name} (d: ${diameter})`} />
                    </div>
                    <div className="col-md-6">
                        <ItemDetails personId={this.state.selectedPerson} />
                    </div>
                </div>
                {/*
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllStarships}
                            renderItem={(item) => item.name} />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson} />
                    </div>
                </div> */}
                    </div >
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};
