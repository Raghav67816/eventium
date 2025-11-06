import * as SecureStore from 'expo-secure-store';

// Get logged in user
async function getUser() {
    let result = await SecureStore.getItemAsync("username");
    if (result){
        return result;
    }
    return null;
}

export default getUser;
