import { collection, getDocs, query, where,addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import "./addStudent.css";

const AddStudent = () => {
  const [Name, setName] = useState("");
  const [Father, setFather] = useState("");
  const [Roll, setRoll] = useState("");
  const [Contact, setContact] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [Picture, setPicture] = useState("");
  const [Course, setCourse] = useState("");
  const [Teacher, setTeacher] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [SearchStudent, setSearchStudent] = useState("");
  //
  const [Document, setDocument] = useState({});

  const setStudentData = async (e) => {
    e.preventDefault();
    const storage = getStorage();
    const filename = `profile/${Picture.name}-${uuidv4()}`;
    const storageRef = ref(storage, filename);
    console.log(Picture.name);
    const uploadTask = uploadBytesResumable(storageRef, Picture);
    console.log(Picture);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // getImg.setAttribute("src", `${downloadURL}`);
          // resolve(downloadURL);
          const url = await downloadURL;
          //  setimgUrl(url)
          console.log(url);
          try {
            const docRef = await addDoc(collection(db, "AddStudentData"), {
              Name: Name,
              Father: Father,
              Roll: Roll,
              Contact: Contact,
              CNIC: CNIC,
              Picture: url,
              Course: Course,
              Teacher: Teacher,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        });
      }
    );
    //
    const q = query(
      collection(db, "AddStudentData"),
      where("Roll", "==", SearchStudent)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = JSON.stringify(doc.data())
      console.log(data );
      console.log(JSON.parse(data) );
      let mata = JSON.parse(data)
      console.log(mata);
      setDocument(JSON.parse(data));


      
      // console.log(doc);
    });
    // c
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={setStudentData}>
        <table className={"Addtable"}>
          <tr>
            <td>
              {" "}
              <input
                type="text"
                id="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Name"
              />
            </td>
            <td>
              {" "}
              <input
                type="text"
                id="Father"
                onChange={(e) => {
                  setFather(e.target.value);
                }}
                placeholder="Father Name"
              />
            </td>
            <td>
              <input
                type="text"
                id="Roll"
                onChange={(e) => {
                  setRoll(e.target.value);
                  setSearchStudent(e.target.value);
                }}
                placeholder="Roll Number"
              />
            </td>
          </tr>
          <tr className="abcd">
            <td>
              <input
                type="text"
                id="Contact"
                onChange={(e) => {
                  setContact(e.target.value);
                }}
                placeholder="Contact Number"
              />
            </td>
            <td>
              <input
                type="number"
                id="CNIC"
                onChange={(e) => {
                  setCNIC(e.target.value);
                }}
                placeholder="CNIC number"
              />
            </td>
            <td>
              <input
                type="file"
                id="Picture"
                onChange={(e) => {
                  setPicture(e.target.files[0]);
                  console.log(e.target.files[0]);
                }}
                placeholder="Picture"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                id="Course"
                onChange={(e) => {
                  setCourse(e.target.value);
                }}
                placeholder="Course Name"
              />
            </td>
            <td>
              <select 
                name="class"
                id="adminSetClass"
                onChange={(e) => {
                  setTeacher(e.target.value);
                }}
              >
                <option defaultValue={"Add Teacher"} disabled>
                  Add Teacher
                </option>
                <option value="inzimam">inzimam</option>
                <option value="haider">haider</option>
                <option value="ghous">ghous</option>
              </select>
            </td>
            <td>
              <input type="submit" className="AddBtn" value={"submit"} />
            </td>
          </tr>
        </table>
      </form>
      
    </div>
  );
};
export default AddStudent;
