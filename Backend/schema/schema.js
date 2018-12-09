const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
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
            type    : BookingType,
            resolve(parent, args){

            } 
        },
        oBookings   : { 
            type    : BookingType,
            resolve(parent, args){

            } 
        },
        listings    : { 
            type    : PropertyType,
            resolve(parent, args){
                
            }
        }, 
    })
});

const PropertyType = new GraphQLObjectType({
    name: 'Property',
    fields: () => ({
        id              : { type: GraphQLID },
        prop_type       : { type: GraphQLString },
        title           : { type: GraphQLString },
        description     : { type: GraphQLString },
        owner_id        : { type: GraphQLString },
        numSleep        : { type: GraphQLInt },
        numBath         : { type: GraphQLInt },
        numBed          : { type: GraphQLInt },
        minStay         : { type: GraphQLInt },
        city            : { type: GraphQLString },
        state           : { type: GraphQLString },
        price           : { type: GraphQLInt },
        streetAdderess  : { type: GraphQLString },
        fromDate        : { type: GraphQLString },
        toDate          : { type: GraphQLString },
        photoURL        : { type: GraphQLString },
        bookings        : { 
            type        : BookingType,
            resolve(parent, args){

            } 
        },
        ownerDetails: { 
            type    : UserType,
            resolve(parent, args){

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
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        userDetails: {
            type: UserType,
            args: { id: { type : GraphQLID }},
            resolve(parent, args){
                
            }
        },

        propertyDetails: {
            type: PropertyType,
            args: { id: { type : GraphQLID }},
            resolve(parent, args){

            }
        },

        searchProperties: {
            type: PropertyType,
            args: { }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {


        },

        updateUser: {


        },

        bookProperty: {


        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
}); 