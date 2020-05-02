import axiosInstance from "../../api-handlers/apiCall";
import { mutationTypes } from "../mutations/studentMutations";
const {
  SAVE_STUDENTS,
  SAVE_STUDENT,
  ADD_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
} = mutationTypes;

const loadStudents = "loadStudents";
const searchStudents = "searchStudents";
const deleteStudent = "deleteStudent";
const findStudent = "findStudent";
const saveStudent = "saveStudent";
const updateStudent = "updateStudent";

export const actionTypes = {
  loadStudents,
  searchStudents,
  deleteStudent,
  findStudent,
  saveStudent,
  updateStudent,
};
export const actions = {
  [loadStudents]: async ({ commit }, page = 0, size = 5) => {
    const uri = `students?page=${page}&size=${size}`; 
    await wait(700); 
    const { data } = await axiosInstance.get(uri);
    commit(SAVE_STUDENTS, data);
    return;
  },
  [searchStudents]: async ({ commit }, searchValue) => {
    const uri = `students?q=${searchValue}`;
    await wait(700);
    const { data } = await axiosInstance.get(uri);
    commit(SAVE_STUDENTS, data);
    return;
  },
  [deleteStudent]: async ({ commit }, id) => {
    const uri = `students/${id}`;
    await wait(700);
    const { data } = await axiosInstance.delete(uri);
    commit(DELETE_STUDENT, data.id);
    return;
  },
  [findStudent]: ({ commit }, student) => {
    commit(SAVE_STUDENT, student);
  },
  [saveStudent]: async ({ commit }, formData) => {
    const uri = `students`;
    await wait(700);
    const { data } = await axiosInstance.post(uri, formData);
    commit(ADD_STUDENT, data);
    return;
  },
  [updateStudent]: async ({ commit }, formData) => {
    console.log(formData.id);
    const uri = `students/${formData.id}`;
    await wait(700);
    const { data } = await axiosInstance.put(uri, formData);
    commit(UPDATE_STUDENT, data.id);
    return;
  },
};

//Demonstrate delays in network
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
