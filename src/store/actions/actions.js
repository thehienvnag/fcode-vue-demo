import {
  SAVE_STUDENTS,
  SAVE_ONE_STUDENT,
  REMOVE_STUDENT,
  SAVE_NEW_STUDENT,
  UPDATE_STUDENT,
} from "../mutation-types/mutation-types";
import axiosInstance from "../../api-handlers/apiCall";

export const searchStudentsAction = ({ commit }, searchValue) => {
  return new Promise((resolve, reject) => {
    if (searchValue) {
      const uri = `students?q=${searchValue}`;

      setTimeout(() => {
        axiosInstance
          .get(uri)
          .then(({ data }) => {
            commit(SAVE_STUDENTS, data);
            resolve(data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      }, 700);
    }
  });
};

export const loadStudentsAction = ({ commit }, page = 0, size = 5) => {
  return new Promise((resolve, reject) => {
    const uri = `students?page=${page}&size=${size}`;
    setTimeout(() => {
      axiosInstance
        .get(uri)
        .then(({ data }) => {
          commit(SAVE_STUDENTS, data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }, 700);
  });
};

export const getStudentAction = ({ commit }, student) => {
  commit(SAVE_ONE_STUDENT, student);
};

// export const getStudentAction = ({commit}, id) => {
//     const uri = `students/${id}`;

//     axiosInstance.get(uri).then(({data}) => {
//         commit(SAVE_ONE_STUDENT, data);
//     }).catch(err => {
//         console.log(err);
//     })
// }

export const deleteStudentAction = ({ commit }, id) => {
  const uri = `students/${id}`;

  axiosInstance
    .delete(uri)
    .then(({ data }) => {
      commit(REMOVE_STUDENT, data.id);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveStudentAction = ({ commit }, formData) => {
  return new Promise((resolve, reject) => {
    const uri = `students`;
    setTimeout(() => {
      axiosInstance
        .post(uri, formData)
        .then(({ data }) => {
          commit(SAVE_NEW_STUDENT, data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }, 800);
  });
};

export const updateStudentAction = ({ commit }, formData) => {
  return new Promise((resolve, reject) => {
    const uri = `students/${formData.id}`;
    setTimeout(() => {
      axiosInstance
        .put(uri, formData)
        .then(({ data }) => {
          commit(UPDATE_STUDENT, data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }, 800);
  });
};
