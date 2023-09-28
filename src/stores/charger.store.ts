import type {Writable} from "svelte/store";
import {get, writable} from "svelte/store";
import {delay} from "../helpers/time.helper";
import type {ICharger} from "../interfaces/ICharger";
import {jwt, user} from "./auth.store";

export const chargers: Writable<ICharger[]> = writable([])
export const chargersActive = writable(false)
const handleGetChargers = async () => {
    try {
        const response = await fetch('http://localhost:5284/api/chargers',
            {method: "GET"}
        );
        const data = await response.json();
        console.log("Got data: ", data)
        chargers.set(data)
    } catch (e) {
        console.log("Error: ", e)
    }
}

export const handleChargersLongPool = async () => {
    if (get(chargersActive)) {
        return
    }
    chargersActive.set(true)
    for (; ;) {
        await handleGetChargers();
        await delay(5000);
    }

}

export const handleAddCharger = async (obj: any) => {
    try {
        let jwtString: string | null = get(jwt)
        if (!jwtString) jwtString = localStorage.getItem("jwt");
        if (!jwtString) return {data: null, status: false};


        const charger = {
            chargerIdentificator: obj.chargerId as string,
            latitude: obj.latitude,
            longitude: obj.longitude,
            model: "Test",
            city: obj.city,
            companyId: get(user)?.companyId,
            country: obj.country,
            description: obj.description,
            firmwareVersion: "1.6",
            postalNumber: obj.postalNumber,
            street: obj.street,
            vendor: "Test"
        }
        const json = JSON.stringify(charger);

        const response = await fetch('http://localhost:5284/api/chargers',
            {
                method: "POST",
                body: json,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwtString,
                },
            }
        );
        const data = await response.json();
        return {data, status: true}
    } catch (e) {
        console.log("Error: ", e)
        return {data: null, status: false};
    }
}