import { CreateCourseRequest } from "@/types/course";
import api from "./api";

const URL_PREFIX = 'api/Courses'

export function getMyCourses() {
    return api.get(`${URL_PREFIX}/mine`);
}

export function getCourseOverview(courseId: string) {
    return api.get(`${URL_PREFIX}/overview/${courseId}`);
}

export function createCourse(request: CreateCourseRequest) {
    return api.post(`${URL_PREFIX}`, request);
}

export function getAllCourses() {
    return api.get(`${URL_PREFIX}/`);
}