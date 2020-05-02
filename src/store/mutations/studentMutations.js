const SAVE_STUDENTS = "SAVE_STUDENTS";
const DELETE_STUDENT = "DELETE_STUDENT";
const ADD_STUDENT = "SAVE_STUDENT";
const UPDATE_STUDENT = "UPDATE_STUDENT";
const SAVE_STUDENT = "SAVE_STUDENT";

export const mutationTypes = {
  SAVE_STUDENTS,
  SAVE_STUDENT,
  ADD_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
};
export const mutations = {
  [SAVE_STUDENTS]: (state, students) => {
    state.students = students;
  },
  [SAVE_STUDENT]: (state, student) => {
    state.student = student;
  },
  [ADD_STUDENT]: (state, formData) => {
    const newStudentList = [...state.students.content, formData];
    state.students.content = newStudentList;
  },
  [DELETE_STUDENT]: (state, id) => {
    const newStudentsList = state.students.content.filter(
      (stu) => stu.id != id
    );
    state.students.content = newStudentsList;
  },
  [UPDATE_STUDENT]: (state, formData) => {
    state.students.content.map((stu) => {
      if (stu.id == formData.id) {
        Object.assign(stu, formData);
      }
      return stu;
    });
  },
};
