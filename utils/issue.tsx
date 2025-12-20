import { API_URL } from "./constants";
import { ToastAndroid } from "react-native";

export async function getIssuedItems(id: string): Promise<string[]> {
    let items = [];

    try {
        const response = await fetch(`${API_URL}/items/issued`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                "_id": id
            })
        })

        if (response.ok) {
            items = await response.json();
        }

        return items;
    }

    catch (e) {
        console.error(`Failed to fetch items: ${e}`);
        ToastAndroid.show("Failed to fetch items, please try again.", ToastAndroid.SHORT);
        return items;
    }
}

export async function issueItem(id: string, items: string[]){
    try {
        const response = await fetch(`${API_URL}/items/issue`, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                "_id": id,
                "items": items
            })
        })

        if (response.ok) {
            items = await response.json();
            ToastAndroid.show("Item issued succesfully.", ToastAndroid.SHORT);
        }
    }

    catch (e) {
        console.error(`Failed to issue items: ${e}`);
        ToastAndroid.show("Failed to issue items, please try again.", ToastAndroid.SHORT);
    }
}