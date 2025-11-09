import * as SecureStore from 'expo-secure-store';

const url = "https://1c8e999fcffb.ngrok-free.app"

export type Org = {
    email: string,
};

// Get events
export async function getEvents(){
    let events = null;
    const email = await SecureStore.getItemAsync("email");
    const token = await SecureStore.getItemAsync("access_token");
    const response = await fetch(
        `${url}/event/my-events`,
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

// Add orgs to view
export async function addOrgsToView(eventId: string): Promise<Array<Org>>{
    let orgs = null;
    const response = await fetch(
        `${url}/event/query/general`,
        {
            body: JSON.stringify({
                'field': 'organisers',
                'id': eventId
            }),
            method: "POST"
        }
    )

    if (response.ok){
        const orgs_ = await response.json();
        orgs = orgs_.data.organisers
    }

    console.log("error");
    console.log(orgs);
    return orgs;
}