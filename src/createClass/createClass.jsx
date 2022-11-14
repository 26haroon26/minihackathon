import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { toast } from "react-toastify";
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
      const docRef = await addDoc(collection(db, "Classes"), {
        ClassTiming: ClassTiming,
        Schedule: Schedule,
        Teachers: Teachers,
        Section: Section,
        Batch: Batch,
        CourseName: CourseName,
      });
      // console.log("Document written with ID: ", docRef.id);
      toast.success("Class create successfully");

    } catch (e) {
      // console.error("Error adding document: ", e);
      toast.error("Try Again");

    }
  };

  return (
    <form onSubmit={sett}>
      <table>
        <thead>
          <tr><td><h1>Create class</h1></td></tr>
        </thead>
        <tbody>
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
          <tr >
            <td>
            </td>
            <td>
              <input type="submit" id='createClassBtn' value={"submit"} />
            </td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
export default CreateClass;
