import { ToastAndroid } from 'react-native';
import * as SecureStore from 'expo-secure-store';


export function setUrl(url: string){
    SecureStore.setItemAsync("url", url);
}

export async function getUrl(): Promise<string>{
    let result = await SecureStore.getItemAsync("url");
    if (result) {
        return result
    }
    return "";
}

/*
getUser (locally)

check if a user is already signed in.
*/
export async function getUser() {
    let result = await SecureStore.getItemAsync("access_token");
    // console.log(result);
    // SecureStore.deleteItemAsync("access_token"); // for temp use only
    if (result) {
        return result;
    }
    return null;
}

/* 
requestMagicLink
*/
export async function requestMagicLink(email: string): Promise<boolean> {
    try {
        let url = await getUrl();
        let response = await fetch(`${url}/auth/get-magic-link`, {
            method: "POST",
            headers: { 'Cotent-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        if (response.status == 200) {
            return true;
        }
        return false;
    }

    catch(e) {
        ToastAndroid.show("Unexpected error occurred. Please try again.", ToastAndroid.SHORT);
        console.error(`Failed to request a magic link: ${e}`);
        return false;
    }
}

/*
verifyOtp
check if the otp provided is correct or not.
 */
export async function verifyOtp(email: string, token: string): Promise<boolean> {
    let isValid = false;
    let url = await getUrl();
    let response = await fetch(`${url}/auth/verify-otp`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token })
    })
    try{
        if (response.status == 200) {
            let res = await response.json();
            if (res['msg'] == "success" && res['access_token']) {
                SecureStore.setItemAsync("access_token", res['access_token'])
                SecureStore.setItemAsync("email", email)
                isValid = true;
            }
        }

        else {
            console.log("failed");
            isValid = false;
        }

        return isValid;
    }

    catch(e){
        console.error(`Failed to verify OTP: ${e}`);
        ToastAndroid.show("Unexpected Error Occured. Please Login Again.", ToastAndroid.SHORT);
        isValid = false;
        return isValid;
    }
}

// remove access_token to sign out
export async function signOut() {
    SecureStore.deleteItemAsync("access_token");
}

// register user
export async function signUp(
    email: string, name: string, phone: string, password: string
) {
    let status = "failed";
    let url = await getUrl();
    const resp = await fetch(`${url}/auth/signup`, {
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

    if (resp.ok) {
        status = "success";
    }

    return status;
}

