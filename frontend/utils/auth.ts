import * as SecureStore from 'expo-secure-store';

// Get logged in user
export async function getUser() {
    let result = await SecureStore.getItemAsync("username");
    if (result){
        return result;
    }
    return null;
}

// Request a magic link
export async function requestMagicLink(email: string){
    let response = await fetch("https://ceaed5f7871b.ngrok-free.app/auth/get-magic-link", {
        method: "POST",
        headers: {'Cotent-Type': 'application/json'},
        body: JSON.stringify({ email })
    })
    if(response.status == 200){
        console.log("Request accepted");
    }
}

// verify jwt token
export async function verifyJwt(token: string): Promise<string>{
    let response = await fetch("https://ceaed5f7871b.ngrok-free.app/auth/verify-jwt", {
        method: "POST",
        headers: {'Cotent-Type': 'application/json'},
        body: JSON.stringify({ token })
    })
    if(response.status == 200){
        return "token verified";
    }
    return "";
}
