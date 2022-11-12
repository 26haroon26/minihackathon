import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import {React, useState } from "react";
//
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
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
  return (<>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={url}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  
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
        <input
          type="text"
          placeholder="Name"
          value={Document.Name}
          id="StudentName"
        />
        <input
          type="text"
          placeholder="Father"
          value={Document.Father}
          id="StudentFather"
        />
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
        <img src={Document.Picture} alt="aa" width={'200px'} />
        {/* <input
          type="text"
          placeholder="Picture"
          value={Document.Picture}
          id="StudentPicture"
        /> */}
        <input
          type="text"
          placeholder="Course"
          value={Document.Course}
          id="StudentCourse"
        />
      </form>
    </div>
  </>

  );
};
export default Attendence;
