import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

const AddStudent = () => {
  const [Name, setName] = useState("");
  const [Father, setFather] = useState("");
  const [Roll, setRoll] = useState("");
  const [Contact, setContact] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [Picture, setPicture] = useState("");
  const [Course, setCourse] = useState("");

  const setStudentData = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "AddStudentData"), {
        Name: Name,
        Father: Father,
        Roll: Roll,
        Contact: Contact,
        CNIC: CNIC,
        Picture: Picture,
        Course: Course,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
        <h1>Add Student</h1>

      <form onSubmit={setStudentData}>
        <input
          type="text"
          id="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        />
        <input
          type="text"
          id="Father"
          onChange={(e) => {
            setFather(e.target.value);
          }}
          placeholder="Father Name"
        />
        <input
          type="text"
          id="Roll"
          onChange={(e) => {
            setRoll(e.target.value);
          }}
          placeholder="Roll Number"
        />
        <input
          type="text"
          id="Contact"
          onChange={(e) => {
            setContact(e.target.value);
          }}
          placeholder="Contact Number"
        />
        <input
          type="number"
          id="CNIC"
          onChange={(e) => {
            setCNIC(e.target.value);
          }}
          placeholder="CNIC number"
        />
        <input
          type="text"
          id="Picture"
          onChange={(e) => {
            setPicture(e.target.value);
          }}
          placeholder="Picture"
        />
        <input
          type="text"
          id="Course"
          onChange={(e) => {
            setCourse(e.target.value);
          }}
          placeholder="Course Name"
        />
        <select name="class" id="adminSetClass">
          <option value="inzimam">inzimam</option>
          <option value="inzimam">inzimam</option>
        </select>
        <input type="submit" value={"submit"} />
      </form>
    </div>
  );
};
export default AddStudent;
