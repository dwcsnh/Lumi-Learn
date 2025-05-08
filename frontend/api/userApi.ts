import { changePasswordRequest } from "@/types/changePassword";
import api from "./api";

const URL_PREFIX = "api/Users"

export function getUserProfile() {
    return api.get(`/${URL_PREFIX}/my-profile`)
}

export function changePasswordApi(payload: changePasswordRequest) {
    return api.patch(`/${URL_PREFIX}/change-password`, payload);
}