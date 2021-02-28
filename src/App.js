import { createApi } from "unsplash-js";
import './App.css';
import React, { useEffect, useState } from "react";
import Card from './components/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import AutoComplete from './components/Autocomplete';


const api = createApi({
  accessKey: process.env.REACT_APP_ACCESS_KEY
});


const Div = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, 300px);
grid-template-rows: repeat(auto-fill, auto);
gap: 33px 20px;
justify-content: center;
align-content: center;
margin-top:20px;

.container{
  margin: auto;
  border: 10px solid #fff;
  border-bottom: 45px solid #fff;
  -webkit-box-shadow: 3px 3px 3px #777;
  -moz-box-shadow: 3px 3px 3px #777;
  box-shadow: 3px 3px 3px #777;
}
`

function App() {
   
  const [search, setSearch] =useState('');
  const [data, setPhotosResponse] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);
   const [option, setOption] = useState([]);
   const [filteredSuggestions, setFilter] =useState([]);


  const handleForm =(event)=>{
    //if empty...
     event.preventDefault();
    setApiLoaded(false);
      // localStorage.clear()
     let myKey = localStorage.length;
    for(let key in localStorage){
      if(!localStorage.hasOwnProperty(search) && search){
      localStorage.setItem(search, myKey);

      let copyOption = []
        copyOption = option
        if(option.length < 5){
          copyOption.push(search)
          setOption(copyOption)
        }else{
          copyOption.shift()
          copyOption.push(search)
          setOption(copyOption)
        } continue;
      }
    }
 
    api.search
      .getPhotos({ query: search, orientation: "landscape" })
      .then(result => {
        setPhotosResponse(result.response.results);
        setApiLoaded(true)
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }

  useEffect(() => {
    let options = Object.keys(localStorage)
    if(options.length <= 5){
      setOption(options)
    }else{
    setOption(options.slice(options.length - 5))}
  
    api.photos
      .getRandom({count: 10})
      .then(result => {
        setPhotosResponse(result.response);
        setApiLoaded(true)
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

const onChange=(event)=>{
 setSearch(event.target.value);
const filtered = option.filter(
  (option)=>option.toLowerCase().indexOf(search.toLowerCase()) > -1)
  event.target.value == "" ? setFilter(option) : setFilter(filtered);
}
 

  return (
    <div className="App">
     <form onSubmit={handleForm} className="form">
     {/* <input
        value={search}
        onChange={(event)=>setSearch(event.target.value)}
        placeholder='search'
        /> */}
        <AutoComplete
        suggestions={filteredSuggestions}
        onChange={onChange}
        onKeyDown={(event)=>setSearch(event.target.value)}
        value={search}
        
        />
        <button className="btn">Search</button>
     </form>

     {apiLoaded ?
     <Div>
      {data.map(photo=>(
      <div key={photo.id} className="container" >
           <Card photo={photo} />
      </div>
      ))}
     </Div>
    : 
    <CircularProgress className="loading" />
     }
     </div>
  );
}

export default App;
