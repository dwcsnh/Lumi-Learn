import { CourseItemProps } from "@/components/Course/CourseItem"
import { create } from "zustand";

type CourseStore = {
    selectedCourseId: string
    setSelectedCourseId: (courseId: string) => void;
};

const useCourseStore = create<CourseStore>((set) => ({
    selectedCourseId: "", 
    setSelectedCourseId: (courseId) => set({selectedCourseId: courseId})
}));

export default useCourseStore;