import { 
    SAVE_STUDENTS, 
    SAVE_ONE_STUDENT, 
    GET_STUDENT,
    REMOVE_STUDENT,
    SAVE_NEW_STUDENT,
    UPDATE_STUDENT 
} from "../mutation-types/mutation-types";
import { 
    loadStudentsAction,
    getStudentAction, 
    deleteStudentAction, 
    searchStudentsAction,
    saveStudentAction,
    updateStudentAction 
} from "../actions/actions";
import { 
    LOAD_STUDENTS, 
    DELETE_STUDENT,
    SEARCH_STUDENTS,
    SAVE_STUDENT,
    CHANGE_STUDENT
} from "../actions/action-types";
import Student from "../../data-types/Student";

export const studentsModule = {
    state: {
        students: Array,
        student: Student,
        searchLoadingState: false,
        submitLoadingState: false
    },
    mutations: {
        [SAVE_STUDENTS] : (state, students) => {
            state.students = students;
        },
        [SAVE_ONE_STUDENT]: (state, student) => {
            state.student = student;
        },
        [REMOVE_STUDENT]: (state, id) => {
            const newStudentsList = state.students.content.filter(stu => stu.id != id);
            state.students.content = newStudentsList;
        },
        [SAVE_NEW_STUDENT]: (state, formData) => {
            const newStudentList = [...state.students.content, formData];
            state.students.content = newStudentList;
        },
        [UPDATE_STUDENT]: (state, formData) => {
            state.students.content.map(stu => {
                if(stu.id == formData.id){
                    Object.assign(stu, formData);
                }
                return stu;
            })
        }
    },
    actions: {
        [LOAD_STUDENTS]: loadStudentsAction,
        [DELETE_STUDENT]: deleteStudentAction,
        [SEARCH_STUDENTS]: searchStudentsAction,
        [SAVE_STUDENT]: saveStudentAction,
        [GET_STUDENT]: getStudentAction,
        [CHANGE_STUDENT]: updateStudentAction
    },
    getters: {
        getStudentById: state => id => {
            return state.students.content.find(stu => stu.id == id);
        }
    }
};
