import * as SecureStore from 'expo-secure-store';
import { Participant } from '@/components/ParticipantCard';

const url = "https://eventium-api.onrender.com"

export type Org = {
    name: string,
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

    console.log(email);

    if (response.ok){
        const res = await response.json();
        console.log("events");
        console.log(res['events']);
        events = res['events']
    }

    console.log(events)

    return events;
}

// Add orgs to view
export async function addOrgsToView(eventId: string): Promise<Array<Org>>{
    let orgs = [];
    const response = await fetch(
        `${url}/event/query/general`,
        {
            body: JSON.stringify({
                'field': 'organisers_id',
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

// Fetch participants
export async function getParticipants(eventId: string): Promise<Array<Participant>>{
    let participants = []
    const response = await fetch(
        `${url}/event/participants`, {
            method: "POST",
            body: JSON.stringify({
                "event_id": eventId,
            })
        }
    )

    if (response.ok){
        const data_ = await response.json();
        participants = data_.participants;
    }

    console.log("participants");
    console.log(participants);
    return participants;
}

// send invite to org
export async function inviteOrg(email: string, role: string){
    const response = await fetch(`${url}/events/invite-org`, {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "role": role
        })
    })

    if(response.ok){
        console.log("invite sent");
    }
}
