import { db } from "../firebase";
import { collection, getDocs, query, where,updateDoc ,doc} from "firebase/firestore";
import {React, useState } from "react";
import './attendence.css'
//
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';import TextField from '@mui/material/TextField';import Box from '@mui/material/Box';
import { async } from "@firebase/util";


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

  const [AttendeceValue, setAttendeceValue] = useState({});
  const [SearchStudent, setSearchStudent] = useState("");
  const [Document, setDocument] = useState({});

  const SearchStudentData = async (e) => {
    e.preventDefault();
    const q = query(
      collection(db, "AddStudentData"),
      where("Roll", "==", SearchStudent)
    );
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      UserId = doc.id;
      let data = JSON.stringify(doc.data())
      console.log(data );
      console.log(JSON.parse(data) );
      let mata = JSON.parse(data)
      console.log(mata);
      setDocument(JSON.parse(data));


      
      // console.log(doc);
    });
    // const querySnapshot = await getDocs(collection(db, "AddStudentData"));
    console.log();
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id}`);
    // });
  };
  const CheckAttendence = async(e)=>{
      e.preventDefault();
      // console.log(Editing.editingfile);
      await updateDoc(doc(db, "AddStudentData", UserId ), {
        ...Document,
        mark:AttendeceValue
      });
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
          <Avatar sx={{  }} aria-label="recipe">
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
          value={Document.Roll}
          id="StudentRoll"
        />
        <input
          type="text"
          placeholder="Contact"
          value={Document.Contact}
          id="StudentContact"
        />
        <input
          type="text"
          placeholder="CNIC"
          value={Document.CNIC}
          id="StudentCNIC"
        />
         <input
          type="text"
          placeholder="Course"
          value={Document.Course}
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
