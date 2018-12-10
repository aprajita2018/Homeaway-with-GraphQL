import { gql } from 'apollo-boost';

export const getSearchProperties = gql`
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

export const getTravellerTrips = gql`
    {
        userDetails(id: "5bd96147425c3961cc24f7f2") {
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