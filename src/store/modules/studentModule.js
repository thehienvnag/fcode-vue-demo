import Student from "../../data-types/Student";
import { mutations } from "../mutations/studentMutations";
import { actions } from "../actions/studentActions";

export const studentsModule = {
  state: {
    students: Array,
    student: Student,
  },
  mutations: mutations,
  actions: actions,
  getters: {
    getStudentById: (state) => (id) => {
      return state.students.content.find((stu) => stu.id == id);
    },
  },
};
