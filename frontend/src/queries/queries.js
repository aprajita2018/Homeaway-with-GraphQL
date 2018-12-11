import { gql } from 'apollo-boost';

export const getUserDetails = gql`
    query getUserDetails($email: String!){
        getUserDetails(email : $email){
            f_name
            l_name
            gender
            phone_num
            city
            state
            hometown
            aboutMe
            language
        }
    }
`;

export const getSearchProperties = gql`
    query getSearchProperties($city: String!, $fromDate: String!, $toDate: String!, $numSleep: Int!){
        searchProperties(city: $city, fromDate: $fromDate, toDate: $toDate, numSleep: $numSleep) {
            property_id
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

export const getOwnerBookings = gql`
    query getOwnerBookings($id: ID!){
        userDetails(id: $id) {
            email
            oBookings{
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

export const getOwnerProperties = gql`
    query getOwnerProperties($id: ID!) {
        userDetails(id: $id){
            id
            listings{
                id
                type
                title
                description
                owner_id
                numSleep
                numBath
                numBed
                minStay
                city
                state
                price
                streetAddress
                fromDate
                toDate
                photoURL
                ownerDetails {
                    id
                    email
                }
            }
        }
    }
`;

export const getPropertyDetails = gql`
    query getPropertyDetails($id: ID!){
        propertyDetails(id: $id){
            id
            type
            title
            description
            owner_id
            numSleep
            numBath
            numBed
            minStay
            city
            state
            price
            streetAddress
            fromDate
            toDate
            photoURL
            bookings { 
                id
            }
            ownerDetails {
                id
                email
                f_name
                l_name
                phone_num
                aboutMe
                city
                state
                language
            }
        }
    }
`;

export const fetchPropertyDetailsByIDs = gql`
    query fetchPropertiesByIDs($ids: [String]!){
        fetchPropertyDetailsByIDs(ids: $ids) {
            id
            type
            title
            description
            owner_id
            numSleep
            numBath
            numBed
            minStay
            city
            state
            price
            streetAddress
            fromDate
            toDate
            photoURL
            bookings { 
                id
            }
            ownerDetails {
                id
                email
                f_name
                l_name
                phone_num
                aboutMe
                city
                state
                language
            }
        }
    }
`;