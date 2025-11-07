import * as SecureStore from 'expo-secure-store';

// Get logged in user
export async function getUser() {
    let result = await SecureStore.getItemAsync("access_token");
    if (result){
        return result;
    }
    return null;
}

// Request a magic link
export async function requestMagicLink(email: string){
    let response = await fetch("https://2f855116ebc2.ngrok-free.app/auth/get-magic-link", {
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
    let response = await fetch("https://2f855116ebc2.ngrok-free.app/auth/verify-otp", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, token})
    })
    if(response.status == 200){
        let res = await response.json();
        if (res['msg'] == "success" && res['access_token']){
            console.log(res['access_token'])
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
