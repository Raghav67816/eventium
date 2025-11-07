import * as SecureStore from 'expo-secure-store';

// Get events
export async function getEvents(){
    let events = null;
    const email = await SecureStore.getItemAsync("email");
    const token = await SecureStore.getItemAsync("access_token");
    const response = await fetch(
        "https://a8bd56213a94.ngrok-free.app/event/my-events",
        {
            headers: {"Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
            },
            body: JSON.stringify({email}),
            method: "POST"
        }
    )

    if (response.ok){
        const res = await response.json();
        console.log(res['events']);
        events = res['events']
    }

    console.log(events)

    return events;
}