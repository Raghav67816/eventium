import { API_URL } from './constants';
import { ToastAndroid } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Participant } from '@/components/ParticipantCard';

export type Org = {
    name: string,
    email: string,
    pfp: string
};

/*
getEvents

get events from the db
 */
export async function getEvents(){
    let events = [];
    const email = await SecureStore.getItemAsync("email");
    const token = await SecureStore.getItemAsync("access_token");

    try{
        const response = await fetch(
            `${API_URL}/event/events`,
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
            events = res;
        }
    }

    catch(e){
        console.error(`Failed to fetch events: ${e}`);
        ToastAndroid.show("Failed to fetch events. Please try again.", ToastAndroid.SHORT);
        events = [];
    }

    return events;
}


// Fetch participants
export async function getParticipants(eventId: string): Promise<Array<Participant>>{
    console.log(eventId)
    let participants = [];

    try {
        const response = await fetch(
            `${API_URL}/event/participants`, {
                method: "POST",
                body: JSON.stringify({
                    "event_id": eventId.toString(),
                })
            }
        )

        if (response.ok){
            participants = await response.json();
        }
    }

    catch(e){
        console.error(`Failed to fetch participants: ${e}`);
        ToastAndroid.show("Failed to fetch participants, please try again.", ToastAndroid.SHORT);
    }
    return participants;
}

// get organisers
export async function getOrgs(event_id: string){
    let orgs = [];

    try {
        const response = await fetch(`${API_URL}/events/orgs`, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({
                "event_id": event_id
            })
        })

        if(response.ok){
            orgs = await response.json();
        }

        return orgs;
    }

    catch(e){
        console.error(`Failed to fetch organisers: ${e}`);
        ToastAndroid.show("Failed to fetch organisers, please try again.", ToastAndroid.SHORT);
        return orgs;
    }
}

