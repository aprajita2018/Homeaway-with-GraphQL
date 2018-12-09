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
        // tBookings   : { 
        //     type    : BookingType,
        //     resolve(parent, args){

        //     } 
        // },
        // oBookings   : { 
        //     type    : BookingType,
        //     resolve(parent, args){

        //     } 
        // },
        // listings    : { 
        //     type    : PropertyType,
        //     resolve(parent, args){
                
        //     }
        // }, 
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
        streetAdderess  : { type: GraphQLString },
        fromDate        : { type: GraphQLString },
        toDate          : { type: GraphQLString },
        photoURL        : { type: GraphQLString },
        // bookings        : { 
        //     type        : BookingType,
        //     resolve(parent, args){

        //     } 
        // },
        // ownerDetails: { 
        //     type    : UserType,
        //     resolve(parent, args){

        //     }
        // } 
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
                return User.getUserById(args.id);
            }
        },
        
        propertyDetails: {
            type: PropertyType,
            args: { 
                id: { type : GraphQLID }
            },
            resolve(parent, args){
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

                return Property.searchProperties(values);
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
                console.log('Inside addUser resolver.');

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

        // updateUser: {


        // },

        // bookProperty: {


        // },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
}); 