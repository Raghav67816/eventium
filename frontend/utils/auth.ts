import * as SecureStore from 'expo-secure-store';

const endpoint = "https://2f161a260719.ngrok-free.app"

// Get logged in user
export async function getUser() {
    let result = await SecureStore.getItemAsync("access_token");
    // SecureStore.deleteItemAsync("access_token"); // for temp use only
    if (result){
        return result;
    }
    return null;
}

// Request a magic link
export async function requestMagicLink(email: string){
    let response = await fetch(`${endpoint}/auth/get-magic-link`, {
        method: "POST",
        headers: {'Cotent-Type': 'application/json'},
        body: JSON.stringify({ email })
    })
    if(response.status == 200){
        return "success";
    }
    return "failed"
}

// Verify Otp
export async function verifyOtp(email:string, token: string): Promise<string>{
    let response = await fetch(`${endpoint}/auth/verify-otp`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, token})
    })
    if(response.status == 200){
        let res = await response.json();
        if (res['msg'] == "success" && res['access_token']){
            SecureStore.setItemAsync("access_token", res['access_token'])
            SecureStore.setItemAsync("email", email)
            return "success"
        }
    }

    else{
        console.log("failed");
        return "failed"
    }
    return "";
}

// remove access_token to sign out
export async function signOut(){
    SecureStore.deleteItemAsync("access_token");
}

// register user
export async function signUp(
    email: string, name: string, phone: string, password: string
){
    let status = "failed";
    const resp = await fetch(`${endpoint}/auth/signup`, {
        method: "POST",
        headers: {
            "Cotent-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "name": name,
            "phone": phone,
            "password": password
        })
    })
    
    if(resp.ok){
        status = "success";
    }

    return status;
}

