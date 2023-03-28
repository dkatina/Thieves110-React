import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth, db } from '../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'


const theme = createTheme();

export default function SearchChampion() {
  const [champion, setChampion] = useState('')
  const [championData, setChampionData] = useState({})

  
  // fetching to specific champion/data
  const getChampionData = async (name) => {

    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion/${name}.json`)
    const data = await response.json()
    console.log(data)

    const championImage = await fetch(`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${name}.png`)
    console.log(championImage)

    setChampionData({
      name: data.data[name].name,
      title: data.data[name].title,
      lore: data.data[name].lore,
      difficulty: data.data[name].info.difficulty,
      type: data.data[name].tags[0],
      image: championImage.url
    })
  }
  
  // add to our database
  useEffect(() => {
    const addToFirebase = async () => {
        console.log(auth.currentUser.uid)
        await setDoc(doc(db, "users", auth.currentUser.uid, "champions", championData.type), {
          name: championData.name,
          title: championData.title,
          lore: championData.lore,
          difficulty: championData.difficulty,
          image: championData.image
        });
    }
    if(Object.keys(championData).length !== 0){
      console.log('added to firebase')
      addToFirebase()
    }
  }, [championData])

  // handles our search
  const handleSubmit = (event) => {
    event.preventDefault();
    const titleChampion = champion[0].toUpperCase() + champion.slice(1,).toLowerCase()
    getChampionData(titleChampion)
    console.log(championData)
  };

  // Get current team
  const getCurrentTeam = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log(docSnap)
      console.log(docSnap.data())
    } else {
      console.log('No such document')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            LoL Champion Builder
          </Typography>
          <img src='https://images6.alphacoders.com/651/651136.jpg'/>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="champion"
              label="Search Champion"
              name="champion"
              autoFocus
              onChange={(event) => {setChampion(event.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add to Team
            </Button>
            <Button
              onClick={getCurrentTeam}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Get Current Team
            </Button>
          </Box>
        </Box>
        <img src={championData.image}/>
      </Container>
    </ThemeProvider>
  );
}