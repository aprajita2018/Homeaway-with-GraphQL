const graphql = require('graphql');
const _ = require('lodash');
var User = require('../models/user');
var Property = require('../models/property');
var Booking = require('../models/booking');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id          : { type: GraphQLID },
        user_type   : { type: GraphQLString },
        f_name      : { type: GraphQLString },
        l_name      : { type: GraphQLString },
        email       : { type: GraphQLString },
        password    : { type: GraphQLString },
        gender      : { type: GraphQLString },
        phone_num   : { type: GraphQLString },
        hometown    : { type: GraphQLString },
        city        : { type: GraphQLString },
        state       : { type: GraphQLString },
        language    : { type: GraphQLString },
        aboutMe     : { type: GraphQLString },
        joined_date : { type: GraphQLString },
        photoURL    : { type: GraphQLString },
        tBookings   : { 
            type    : new GraphQLList(BookingType),
            resolve(parent, args){
                let values = {
                    user_id: parent.id
                };
                return Booking.fetchTravellerBookings(values);
            } 
        },
        oBookings   : { 
            type    : new GraphQLList(BookingType),
            resolve(parent, args){
                let values = {
                    owner_id: parent.id
                };
                return Booking.fetchOwnerBookings(values);
            } 
        },
        listings    : { 
            type    : new GraphQLList(PropertyType),
            resolve(parent, args){
                let values = {
                    owner_id: parent.id
                }
                return Property.fetchProperties(values);
            }
        }, 
    })
});

const creation_response = new GraphQLObjectType({
    name: 'CreationResponse',
    fields: () => ({
        status: {type: GraphQLString},
        message: {type: GraphQLString}
    })
});

const PropertyType = new GraphQLObjectType({
    name: 'Property',
    fields: () => ({
        id              : { type: GraphQLID },
        type            : { type: GraphQLString },
        title           : { type: GraphQLString },
        description     : { type: GraphQLString },
        owner_id        : { type: GraphQLString },
        numSleep        : { type: GraphQLInt },
        numBath         : { type: GraphQLString },
        numBed          : { type: GraphQLString },
        minStay         : { type: GraphQLString },
        city            : { type: GraphQLString },
        state           : { type: GraphQLString },
        price           : { type: GraphQLString },
        streetAddress  : { type: GraphQLString },
        fromDate        : { type: GraphQLString },
        toDate          : { type: GraphQLString },
        photoURL        : { type: GraphQLString },
        bookings        : { 
            type        : new GraphQLList(BookingType),
            resolve(parent, args){
                let values = {
                    property_id: parent.id
                };
                return Booking.fetchPropertyBookings(values);
            } 
        },
        ownerDetails: { 
            type    : UserType,
            resolve(parent, args){
                return User.getUserById(parent.owner_id);
            }
        } 
    })
});

const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => ({
        id              : { type: GraphQLID },
        user_id         : { type: GraphQLString },
        property_id     : { type: GraphQLString },
        owner_id        : { type: GraphQLString },
        pricePerNight   : { type: GraphQLInt },
        fromDate        : { type: GraphQLString },
        toDate          : { type: GraphQLString },
        priceTotal      : { type: GraphQLInt },
        propertyDetails :{
            type        : PropertyType,
            resolve(parent, args){
                return Property.fetchProperty(parent.property_id);
            }
        },
        ownerDetails    :{
            type        : UserType,
            resolve(parent, args){
                return User.getUserById(parent.owner_id);
            }
        },
        travelerDetails :{
            type        :   UserType,
            resolve(parent, args){
                return User.getUserById(parent.user_id);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        userDetails: {
            type: UserType,
            args: { 
                id: { type : GraphQLID }
            },
            resolve(obj, args){
                console.log('Inside RootQueryType > getUserByID query resolver');
                return User.getUserById(args.id);
            }
        },
        
        propertyDetails: {
            type: PropertyType,
            args: { 
                id: { type : GraphQLID }
            },
            resolve(parent, args){
                console.log('Inside RootQueryType > fetchProperty query resolver');
                return Property.fetchProperty(args.id);
            }
        },

        searchProperties: {
            type: new GraphQLList(PropertyType),
            args: { 
                city: {type: GraphQLString},
                fromDate:   {type: GraphQLString},
                toDate: {type: GraphQLString},
                numSleep: {type: GraphQLInt}
            },
            resolve(parent, args){
                let values = {
                    city: args.city,
                    fromDate: args.fromDate,
                    toDate: args.toDate,
                    numSleep: args.numSleep
                };
                console.log('Inside RootQueryType > searchProperties query resolver');
                return Property.searchProperties(values);
            }
        },

        fetchPropertyDetailsByIDs: {
            type: new GraphQLList(PropertyType),
            args: {
                ids: {type: GraphQLList(GraphQLString)}
            },
            resolve(parent, args){
                let values = {
                    ids: args.ids
                };
                console.log('Inside RootQueryType > fetchPropertyDetailsByIDs query resolver');
                return Property.fetchPropertiesByIDs(values);
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        addUser: {
            type: UserType,
            args: {
                user_type : { type: GraphQLString },
                f_name    : { type: GraphQLString },
                l_name    : { type: GraphQLString },
                email     : { type: GraphQLString },
                password  : { type: GraphQLString },
            },

            resolve(parent, args){
                console.log('Inside Mutation > addUser resolver.');

                let newUser = {
                    user_type   : args.user_type,
                    f_name      : args.f_name,
                    l_name      : args.l_name,
                    email       : args.email,
                    password    : args.password,
                };
                User.createUser(newUser);
                return newUser;
            }
        },

        updateUser: {
            type: UserType,
            args: {
                user_id   : { type: GraphQLString },
                f_name    : { type: GraphQLString },
                l_name    : { type: GraphQLString },
                gender    : { type: GraphQLString },
                phone_num : { type: GraphQLString },
                hometown  : { type: GraphQLString },
                city      : { type: GraphQLString },
                state     : { type: GraphQLString },
                language  : { type: GraphQLString },
                aboutMe   : { type: GraphQLString },
            },

            resolve(parent, args){
                console.log('Inside Mutation > updateUser resolver.');

                let user = {
                    user_id     : args.user_id,
                    f_name      : args.f_name,
                    l_name      : args.l_name,
                    phone_num   : args.phone_num,
                    gender      : args.gender,
                    hometown    : args.hometown,
                    city        : args.city,
                    state       : args.state,
                    language    : args.language,
                    aboutMe     : args.aboutMe
                };
                User.updateProfile(user_id, user);
                return user;
            }
        },

        bookProperty: {
            type: BookingType,
            args: {
                user_id        :    { type: GraphQLString },
                property_id    :    { type: GraphQLString },
                owner_id       :    { type: GraphQLString },
                pricePerNight  :    { type: GraphQLString },
                fromDate       :    { type: GraphQLString },
                toDate         :    { type: GraphQLString },
                priceTotal     :    { type: GraphQLInt }
            },
            resolve(parent, args){
                console.log("Inside Mutation > bookProperty : " + JSON.stringify(args));
                let newBooking = {
                    user_id        :    args.user_id,
                    property_id    :    args.property_id,
                    owner_id       :    args.owner_id,
                    pricePerNight  :    args.pricePerNight,
                    fromDate       :    args.fromDate,
                    toDate         :    args.toDate,
                    priceTotal     :    args.priceTotal
                }
                Booking.createBooking(newBooking);
                return newBooking;
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
}); 