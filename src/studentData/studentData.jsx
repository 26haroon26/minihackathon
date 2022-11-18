import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import "./studentData.css";
import moment from "moment/moment";

const StudentData = () => {
  const [StdRoll, setStdRoll] = useState("");
  const [loading, setloading] = useState(false);

  const [completeDataDoc, setcompleteDataDoc] = useState([]);
  const getAllStudent = async () => {
    const querySnapshot = await getDocs(collection(db, "Students"));

    querySnapshot.forEach((doc) => {
      let data = JSON.parse(JSON.stringify(doc.data()));
      completeDataDoc.push(data);
      console.log(completeDataDoc);
      setloading(!loading);
    });
  };
  // useEffect (()=>{

  // },[])
  const GetStudentCompleteData = async (e) => {
    setcompleteDataDoc([]);

    e.preventDefault();
    const q = query(collection(db, "Attendence"), where("Roll", "==", StdRoll));

    const querySnapshot = await getDocs(q);

    let arr = [];
    querySnapshot.forEach((doc) => {
      let data = JSON.parse(JSON.stringify(doc.data()));
      arr.push(...arr, data);
      setcompleteDataDoc(arr);
      setloading(!loading);
    });
    // console.log(completeDataDoc[1].Attendence);
  };
  return (
    <div>
      <form className="stdform" onSubmit={GetStudentCompleteData}>
        <h3>Students data</h3>
        <div>
          <input
            className="stdinp"
            type="text"
            placeholder="Roll Number"
            onChange={(e) => {
              setStdRoll(e.target.value);
            }}
          />
          <input type="submit" value="Check" className="stdbtn" />
        </div>
      </form>
      <div className="GetAll">
      <button  onClick={getAllStudent}>
        get All
      </button>
        </div>{" "}
      <table className="tble">
        <thead className="tbleHead">
          <tr className="tbl1row">
            <td>S.no</td>
            <td>Name</td>
            <td>Father</td>
            <td>Roll</td>
            <td>Attendence</td>
            <td>Teacher</td>
            <td>Course</td>
            <td>Contact</td>
            <td>CNIC</td>
            {/* <td>time</td> */}
          </tr>
        </thead>

        <tbody className="tblebody">
          {completeDataDoc?.map((element, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{element?.Name}</td>
              <td>{element?.Father}</td>
              <td>{element?.Roll}</td>
              <td>{element?.Attendence}</td>
              <td>{element?.Teacher}</td>
              <td>{element?.Course}</td>
              <td>{element?.Contact}</td>
              <td>{element?.CNIC}</td>

              {/* <td>{element?.time.seconds}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StudentData;
