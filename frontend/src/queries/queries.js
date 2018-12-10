import { gql } from 'apollo-boost';

const getSearchProperties = gql`
    {
        searchProperties(city: $city, fromDate: $fromDate, toDate: $toDate, numSleep: $numSleep) {
            property_id
            owner_id
            toDate
            fromDate
            price,
            numSleep,
            minStay
        }

    }
`;

export {getSearchProperties};