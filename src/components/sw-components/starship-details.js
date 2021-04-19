import React from 'react';
import ItemDetails, { Record } from '../item-details';

import { SwapiServiceConsumer } from '../swapi-service-context';

import { withSwapiService } from '../hoc-helpers';


const StarshipDetails = (props) => {
    return (
        <ItemDetails {...props}>

            <Record field="model" label="Model" />
            <Record field="length" label="Length" />
            <Record field="costInCredits" label="Cost" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipImage
    }
}

export default withSwapiService(StarshipDetails, mapMethodsToProps);

// old component
// const StarshipDetails = ({ itemId }) => {
//     return (
//         <SwapiServiceConsumer>
//             {
//                 ({ getStarship, getStarshipImage }) => {
//                     return (
//                         <ItemDetails
//                             itemId={itemId}
//                             getImageUrl={getStarshipImage}
//                             getData={getStarship}>

//                             <Record field="model" label="Model" />
//                             <Record field="length" label="Length" />
//                             <Record field="costInCredits" label="Cost" />
//                         </ItemDetails>
//                     );
//                 }
//             }
//         </SwapiServiceConsumer>
//     );
// };
// export {
//     StarshipDetails
// }