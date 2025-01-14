import * as React from 'react';
import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { doc, deleteDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { AppContext } from '../context/AppContext';

export default function ChampionCard(props) {
  const {setFavPoke} = useContext(AppContext)

  const deleteChampion = async () => {
    await deleteDoc(doc(db, "users", auth.currentUser.uid, "champions", props.champion.type))
    console.log('champion')
    props.getCurrentTeam()
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.champion.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.champion.name}
          </Typography>
          <small>{props.champion.title}</small>
          <hr/>
          <Typography variant="body2" color="text.secondary">
            {props.champion.lore}
          </Typography>
          <Button onClick={deleteChampion} variant="contained" color="error">Remove</Button>
          <Button onClick={() => setFavPoke(props.champion.name)} variant="contained" color="success">Favorite</Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}