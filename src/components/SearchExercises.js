import React,{useState, useEffect} from 'react'
import {Box, Button, Stack, TextField, Typography } from '@mui/material';
import { fetchData, exerciseOptions } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';


const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(()=>{
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
      setBodyParts(['all', ...bodyPartsData])
    }
    fetchExercisesData();
  },[])

  const handelSearch = async () => {
    if(search){
      const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      
      const searchedExercises = exerciseData.filter(exercise => 
       exercise.name.toLowerCase().includes(search)
       ||exercise.bodyPart.toLowerCase().includes(search)
       ||exercise.target.toLowerCase().includes(search)
       ||exercise.equipment.toLowerCase().includes(search)
      )

      setSearch('')
      setExercises(searchedExercises)
    }
  }

  return (
    <Stack alignItems="center" justifyContent="center" mt="37px" p="20px">
      <Typography fontWeight={700} sx={{fontSize: {lg: '44px', xs: '30px'}}} mb="50px" textAlign="center"> 
        Awesome Exercises You <br />
        Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx = {{
            input : {
              fontWeight: '700',
              border: 'none',
              borderRadius: '4px'
            },
            width: {lg: '800px', xs: '350px'},
            backgroundColor: '#fff',
            borderRadius: '40px'
          }}
          height="76px"
          value={search}
          onChange={e => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button className='search-btn' sx={{bgcolor: "#FF2625", color: '#fff', textTransform: 'none', width: {lg: '175px', xs: '80px'}, 
        fontSize: {lg: '20px', xs: '12px'}, height: '56px', position: 'absolute', right: '0'}}
        onClick={handelSearch}
        > 
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px'}}>
        <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      </Box>
    </Stack>
  )
}

export default SearchExercises
