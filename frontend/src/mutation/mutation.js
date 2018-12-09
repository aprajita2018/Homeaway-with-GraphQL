import {gql} from 'apollo-boost';

const addUserMutation = gql`
    mutation AddUser($user_type: String, $f_name: String, $l_name: String, $email: String, $password: String){
        addUser(user_type: $user_type, f_name: $f_name, l_name: $l_name, email: $email, password: $password){
            f_name
            email
            
        }
    }
`;

const loginUserMutation = gql`
    mutation LoginUser($user_type: String, $email: String, $password: String){
        loginUser(user_type: $user_type, email: $email, password: $password){
            email
        }
    }
`;

export {addUserMutation, loginUserMutation};