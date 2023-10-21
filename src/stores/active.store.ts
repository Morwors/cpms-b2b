import type {Writable} from "svelte/store";
import type {ISessionActive} from "../interfaces/ISession";
import {get, writable} from "svelte/store";
import {delay} from "../helpers/time.helper";
import {createPaginationData} from "../helpers/data.helper";
import {PUBLIC_BASE_URL} from '$env/static/public'

export const activePage: Writable<number> = writable(1)
export const activePerPage = writable(10);
export const activePerPageData: Writable<ISessionActive[]> = writable([])
export const actives: Writable<ISessionActive[]> = writable([])
export const activesActive = writable(false)
const handleGetActiveSessions = async () => {
    try {
        const response = await fetch(`${PUBLIC_BASE_URL}api/sessions/active`,
            {method: "GET"}
        );
        const data = await response.json();
        activePerPageData.set(createPaginationData(get(activePerPage),data) as ISessionActive[])
        actives.set(data)
    } catch (e) {
        console.log("Error: ", e)
    }
}

export const handleActiveLongPool = async () => {
    if (get(activesActive)) {
        return
    }
    activesActive.set(true)
    for (; ;) {
        await handleGetActiveSessions();
        await delay(5000);
    }

}

export const handlePerPageChangeActive = (newPerPage: number) => {
    activePerPage.set(newPerPage);
    activePerPageData.set(createPaginationData(get(activePerPage),get(actives)) as ISessionActive[])
    activePage.set(1);
}

export const handlePageChangeActive = (newPage: number) => {
    if(get(activePage) + newPage > get(activePerPageData).length){
        return
    }
    if ((get(activePage) + newPage) <= 0) {
        activePage.set(1);
    } else {
        activePage.set(get(activePage) + newPage)
    }
}