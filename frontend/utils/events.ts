import SecureStorage from 'expo-secure-store'

// Get my events
async function getEvents(){
    fetch("", {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': SecureStorage.getItem('access_token')
        }
    })
}