import {get, writable} from "svelte/store";
import type {Writable} from 'svelte/store'
import {delay} from "../helpers/time.helper";
import type {ICompany} from "../interfaces/ICompany";
import {jwt} from "./auth.store";
import {PUBLIC_BASE_URL} from "$env/static/public";

export const companies: Writable<ICompany[]> = writable([])
export const companiesActive = writable(false)

const handleGetCompanies = async () => {
    try {
        let jwtString: string | null = get(jwt)
        if (!jwtString) jwtString = localStorage.getItem("jwt");
        if (!jwtString) return false;
        const response = await fetch(`${PUBLIC_BASE_URL}api/companies`,
            {
                method: "GET", headers: {
                    "Authorization": "Bearer " + jwtString
                }
            }
        );
        const data = await response.json();
        console.log("Got data: ", data)
        companies.set(data)
    } catch (e) {
        console.log("Error: ", e)
    }
}

export const handleCompaniesLongPool = async () => {
    if (get(companiesActive)) {
        return
    }
    companiesActive.set(true)
    for (; ;) {
        await handleGetCompanies();
        await delay(5000);
    }

}
export const handleCreateCompany = async (data: string) => {
    try {
        let jwtString: string | null = get(jwt)
        if (!jwtString) jwtString = localStorage.getItem("jwt");
        if (!jwtString) return false;
        const response = await fetch(`${PUBLIC_BASE_URL}api/companies`, {
            method: 'POST',
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwtString
            },
        });
        await response.json()
        return true
    } catch (e) {
        console.log("Error: ",e)
        return false
    }
}