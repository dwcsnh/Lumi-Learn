import api from "./api";

const URL_PREFIX = "api/SearchHistories";

export function getMySearchHistories() {
    return api.get(`/${URL_PREFIX}/`);
}

export function deleteSearchHistoryByContent(content: string) {
    return api.delete(`/${URL_PREFIX}?content=${content}`)
}