import React, { Component } from 'react';

import ItemDetails from '../item-details';
import ItemList from '../item-list';
import ErrorIndicator from '../error-indicator';
import Row from '../row';
import ErrorBoundry from '../error-boundry';

import './people-page.css';
import SwapiService from '../../services/swapi-service';


export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({ name, gender, birthYear }) => `${name} (${gender}, ${birthYear})`}
            >
                {/* {(i) => (
                    `${i.name} (${i.birthYear})`)
                } */}
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails itemId={this.state.selectedPerson} />
            </ErrorBoundry>
        );

        return (
            <Row left={itemList} right={personDetails} />
        );
    }
}