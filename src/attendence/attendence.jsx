import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";

const Attendence = () => {
  const [SearchStudent, setSearchStudent] = useState("");
  const SearchStudentData = async (e) => {
    e.preventDefault();
    const q = query(collection(db, "AddStudentData"), where('Roll',"==", SearchStudent))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(`${doc.id} => ${doc.data()}`);
    });
    // const querySnapshot = await getDocs(collection(db, "AddStudentData"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id}`);
    // });
  };
  return (
    <div>
      <h1>Attendence</h1>
      <form onClick={SearchStudentData}>
        <input
          type="search"
          name=""
          id="SearchStudent"
          onChange={(e) => {
            setSearchStudent(e.target.value);
          }}
        />
        <input type="submit" value={"Search"} />
      </form>
      <form>
        <input type="text" placeholder="Name" id="StudentName" />
        <input type="text" placeholder="Father" id="StudentFather" />
        <input type="text" placeholder="Roll" id="StudentRoll" />
        <input type="text" placeholder="Contact" id="StudentContact" />
        <input type="text" placeholder="CNIC" id="StudentCNIC" />
        <input type="text" placeholder="Picture" id="StudentPicture" />
        <input type="text" placeholder="Course" id="StudentCourse" />
      </form>
    </div>
  );
};
export default Attendence;
