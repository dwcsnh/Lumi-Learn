import { CreateCourseRequest } from "@/types/course";
import api from "./api";

const URL_PREFIX = 'api/Courses'

export function getMyCourses() {
    return api.get(`${URL_PREFIX}/mine`);
}

export function getCourseOverview(courseId: string) {
    return api.get(`${URL_PREFIX}/overview/${courseId}`);
}

export function createCourse(formData: FormData) {
    return api.post(`${URL_PREFIX}`, formData);
}

export function getAllCourses() {
    return api.get(`${URL_PREFIX}/`);
}

export function searchCourse(keyword: string) {
    return api.get(`${URL_PREFIX}/search?keyword=${keyword}`)
}