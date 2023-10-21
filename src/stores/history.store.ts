import type {Writable} from "svelte/store";
import type {ISessionHistory} from "../interfaces/ISession";
import {get, writable} from "svelte/store";
import {delay} from "../helpers/time.helper";
import {PUBLIC_BASE_URL} from "$env/static/public";

export const histories: Writable<ISessionHistory[]> = writable([])
export const historyActive = writable(false)
const historySearchActive = writable(false);
export const selectedHistories: Writable<number[]> = writable([]);

export const handleHistorySearchSessions = async (text: string) => {
    try {
        console.log("Finding with text: ", text)
        if (text === "") {
            historySearchActive.set(false);
            return
        } else {
            historySearchActive.set(true)
        }
        const response = await fetch(`${PUBLIC_BASE_URL}api/sessions/searchhistory?keyword=` + text,
            {method: "GET",}
        );
        const data = await response.json();
        histories.set(data)
        console.log("Got data: ", data)
    } catch (e) {
        console.log("Error: ", e)
    }
}
const handleGetHistorySessions = async () => {
    try {
        const response = await fetch(`${PUBLIC_BASE_URL}api/sessions/finished`,
            {method: "GET"}
        );
        const data = await response.json();
        console.log("Got data: ", data)
        histories.set(data)
    } catch (e) {
        console.log("Error: ", e)
    }
}

export const handleHistoryLongPool = async () => {
    if (get(historyActive)) {
        return
    }
    historyActive.set(true)
    for (; ;) {
        if (!get(historySearchActive)) {
            await handleGetHistorySessions();
        }
        await delay(5000);
    }

}

export const handleSelectedHistory = (id: number, status: boolean) => {
    if (id === -1) {
        handleClearSelectedHistory();
        if (status) {
            selectedHistories.set(get(histories).map(el => el.id));
        }
    } else {
        if (!status) {
            selectedHistories.set(get(selectedHistories).filter(el => el !== id));
        } else {
            get(selectedHistories).push(id)
            selectedHistories.set(get(selectedHistories))
            // selectedHistories.set(get(selectedHistories).push(id))
        }
    }
}
export const handleClearSelectedHistory = () => {
    selectedHistories.set([]);
}