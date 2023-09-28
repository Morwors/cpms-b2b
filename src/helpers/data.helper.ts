export function createPaginationData(perPage: number, data: unknown[]) {
    perPage = Number(perPage)
    const perPageData: unknown[] = []
    for (let i = 0; i < data.length; i += perPage) {
        const chunk = data.slice(i, i + perPage);
        perPageData.push(chunk)
        // do whatever
    }
    // console.log("PAGINATION DATA: ", perPageData, data.length, perPage)
    return perPageData
}