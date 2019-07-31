import axios from "axios";

export const addStudent = name => {
  axios
    .post("/api/students/", { name: name })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const deleteStudent = (id, obj) => {
  console.log(id);
  axios
    .delete("/students/" + id, obj)
    .then(res => {
      console.log(res.data.status);
    })
    .catch(err => console.log(err));
};

// Send current user name as teacher name and receive alphabetized students
// export const getStudents = () => {
//   axios.get("/students");
// .then(res => {
//   console.log(res);
//   this.setState(state => ({ students: res.data }));
// })
// .catch(err => {
//   console.log(err);
// });
// };

// export const loadStudent = id => {
//   axios
//     .get("/students/" + id)
//     .then(res => {
//       this.setState(state => ({
//         stickersPlaced: 0,
//         studentName: res.data.student.name,
//         teacherName: res.data.student.teacher,
//         boardsCompleted: res.data.student.boardsCompletedByDate,
//         studentID: res.data.student._id
//       }));
//     })
//     .catch(err => console.log(err));
// };

export const updateStudent = (id, student) => {
  console.log(id);
  console.log(student);
  axios
    .put("/students/" + id, student)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const addTeacher = user => {
  axios
    .post("/signup/", user)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const loginTeacher = user => {
  axios
    .post("/login/", user)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const logoutTeacher = () => {
  axios
    .get("/logout/")
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};
