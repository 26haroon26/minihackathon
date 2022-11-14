import { collection,addDoc, getDocs, query, where, serverTimestamp,} from "firebase/firestore";
import { db } from "../firebase";
import {React, useState } from "react";
import './attendence.css'
import { toast } from "react-toastify";

//
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';import Box from '@mui/material/Box';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Attendence = () => {
  const [expanded, setExpanded] = useState(false);
  let UserId 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [AttendeceValue, setAttendeceValue] = useState('');
  const [SearchStudent, setSearchStudent] = useState("");
  const [Document, setDocument] = useState({});

  const SearchStudentData = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "Students"),
      where("Roll", "==", SearchStudent)
    );
    
    const querySnapshot =await getDocs(q);
    querySnapshot.forEach((doc) => {
      UserId = doc.id;
      let data = JSON.stringify(doc.data())
      setDocument(JSON.parse(data));
    });

  };
  const CheckAttendence = async(e)=>{
      e.preventDefault();
     try {
      const docRef = await addDoc(collection(db, "Attendence"), {
        ...Document,Attendence:AttendeceValue,time:serverTimestamp(),});
      toast.success("Attendence complete");
    } catch (e) {
      toast.error("Try Again");
    }
    };
  
  return (<>
  <div className="maiin">

    <Card className="MainCard">
      <h3 className="attendenceHed">Attendence</h3>
    <Box
      component="form"
      noValidate
      autoComplete="off"
    >
      <div className="seacr">

      <TextField id="filled-basic" label="Filled" variant="filled" onChange={(e) => {
        setSearchStudent(e.target.value);
      }}/>
            
          <IconButton aria-label="settings" onClick={SearchStudentData}>
            <SearchIcon />
          </IconButton>
      </div>
        
    </Box>
    
      <CardHeader className="cardHeader"
        avatar={
          <Avatar aria-label="recipe" className='imgContan'>
            <img width={'100%'} height={'100%'} src={Document.Picture} alt="" />
          </Avatar>
        }
    
        title={Document.Name}
        subheader={Document.Father}
      />
     
      <CardActions >
        {/* <label htmlFor="StudentRoll"></label> */}
      <div className="card">
      <input
          type="text"
          placeholder="Roll"
          defaultValue={Document.Roll}
          id="StudentRoll"
        />
        <input
          type="text"
          placeholder="Contact"
          defaultValue={Document.Contact}
          id="StudentContact"
        />
        <input
          type="text"
          placeholder="CNIC"
          defaultValue={Document.CNIC}
          id="StudentCNIC"
        />
         <input
          type="text"
          placeholder="Course"
          defaultValue={Document.Course}
          // id="Course"
        />
        <select name="" id="teachr" onChange={(e)=>{
         setAttendeceValue(e.target.value)
        }}>
          <option value="Present">Present</option>
          <option value="Leave">Leave</option>
          <option value="Late">Late</option>
          <option value="Absent">Absent</option>
        </select>
        <button onClick={CheckAttendence}>Check</button>
      </div>
      
      </CardActions>

    </Card>
  
    </div>

  </>

  );
};
export default Attendence;
