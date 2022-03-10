export interface FilterViewModel<T> {
    filters: T,
    orderBy: string,
    orderType: string,
    page: number,
    pageSize: number,
    search: boolean
}