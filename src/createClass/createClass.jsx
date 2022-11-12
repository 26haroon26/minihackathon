import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import "./createClass.css";
const CreateClass = () => {
  const [ClassTiming, setClassTiming] = useState("");
  const [Schedule, setSchedule] = useState("");
  const [Teachers, setTeachers] = useState("");
  const [Section, setSection] = useState("");
  const [Batch, setBatch] = useState("");
  const [CourseName, setCourseName] = useState("");

  const sett = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "users"), {
        ClassTiming: ClassTiming,
        Schedule: Schedule,
        Teachers: Teachers,
        Section: Section,
        Batch: Batch,
        CourseName: CourseName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <form onSubmit={sett}>
      <h1>Create class</h1>
      <table>
        <tr>
          <td>
            <input
              type="text"
              id="ClassTiming"
              onChange={(e) => {
                setClassTiming(e.target.value);
              }}
              placeholder="ClassTiming"
            />
          </td>
          <td>
            {" "}
            <input
              type="text"
              id="Schedule"
              onChange={(e) => {
                setSchedule(e.target.value);
              }}
              placeholder="Schedule of classes"
            />
          </td>
          <td>
            <input
              type="text"
              id="Teachers"
              onChange={(e) => {
                setTeachers(e.target.value);
              }}
              placeholder="Teachers name"
            />
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="text"
              id="Section"
              onChange={(e) => {
                setSection(e.target.value);
              }}
              placeholder="Section name"
            />
          </td>
          <td>
            <input
              type="number"
              id="Batch"
              onChange={(e) => {
                setBatch(e.target.value);
              }}
              placeholder="Batch Number"
            />
          </td>
          <td>
            {" "}
            <input
              type="text"
              id="CourseName"
              onChange={(e) => {
                setCourseName(e.target.value);
              }}
              placeholder="Course Name"
            />
          </td>
        </tr>
        <tr className="CreateBtn">
          <td>
            <input type="submit" value={"submit"} />
          </td>
        </tr>
      </table>
    </form>
  );
};
export default CreateClass;
