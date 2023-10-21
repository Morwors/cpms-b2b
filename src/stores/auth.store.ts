import {get, writable} from "svelte/store";
import type {Writable} from 'svelte/store'
import type {IUser} from "../interfaces/IUser";
import {goto} from "$app/navigation";
import {PUBLIC_BASE_URL} from "$env/static/public";

export const jwt = writable("");
export const user: Writable<IUser | null> = writable(null);


export const loginHandler = async (data: FormData) => {
    try {
        const response = await fetch(`${PUBLIC_BASE_URL}api/auth/login`, {
            method: 'POST',
            body: data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Got response: ")
        const res = await response.text()
        jwt.set(res);
        localStorage.setItem("jwt", res)
        return {jwt: res, error: ""}
    } catch (e) {
        console.log("Error: ", e)
        return {jwt: "", error: "Wrong Password"}
    }
}

export const createAdminHandler = async (data: string) => {
    try {
        let jwtString: string | null = get(jwt)
        if (!jwtString) jwtString = localStorage.getItem("jwt");
        if (!jwtString) return false;
        const response = await fetch(`${PUBLIC_BASE_URL}api/auth/registerAdmin`, {
            method: 'POST',
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwtString
            },
        });
        console.log("Got response: ")
        await response.text()
        return true
    } catch (e) {
        console.log("Error: ", e)
        return false
    }
}
export const meHandler = async () => {
    try {
        let jwtString: string | null = get(jwt)
        if (!jwtString) jwtString = localStorage.getItem("jwt");
        if (!jwtString) return false;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + jwtString);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        // @ts-ignore
        const response = await fetch(`${PUBLIC_BASE_URL}api/auth/me`, requestOptions);
        // if(response.status)
        const userData = await response.json();
        if (!userData) return false;
        console.log(userData)
        user.set(userData);
        return true
    } catch (e) {
        console.log("Caught error: ", e);
        return false;
    }

}

export const logout = () => {
    jwt.set("");
    localStorage.setItem("jwt", "")
    goto("/auth/login")
}