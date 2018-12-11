import {gql} from 'apollo-boost';

const addUserMutation = gql`
    mutation AddUser($user_type: String, $f_name: String, $l_name: String, $email: String, $password: String){
        addUser(user_type: $user_type, f_name: $f_name, l_name: $l_name, email: $email, password: $password){
            f_name
            email
            
        }
    }
`;

const updateUserMutation = gql`
    mutation UpdateUserMutation($user_id: String, $f_name: String, $l_name: String, $gender: String, $phone_num: String, $hometown: String, $city: String, $state: String, $language: String, $aboutMe: String){
        updateUser(user_id: $user_id, f_name: $f_name, l_name: $l_name, gender: $gender, phone_num: $phone_num, hometown: $hometown, city: $city, state: $state, $language: String, $aboutMe: String){
            user_id
            f_name
            l_name
            gender
            phone_num
            hometown
            city
            state
            language
            aboutMe
        }
    }
`;

export {addUserMutation, updateUserMutation};