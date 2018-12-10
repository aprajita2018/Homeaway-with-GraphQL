import { gql } from 'apollo-boost';

export const getSearchProperties = gql`
    query getSearchProperties($city: String!, $fromDate: String!, $toDate: String!, $numSleep: Int!){
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

export const getTravellerTrips = gql`
    query getTravellerTrips($id: ID!){
        userDetails(id: $id) {
            email
            tBookings{
                id
                user_id
                owner_id
                priceTotal
                fromDate
                toDate
                pricePerNight
                propertyDetails {
                    id
                    photoURL
                    title
                    description
                    type
                    numSleep
                    numBath
                    numBed
                    minStay
                    streetAddress
                    city
                    state
                }
                ownerDetails {
                    id
                }
                travelerDetails {
                    id
                }
            }
        }

    }
`;