import './App.css';
import React, { useEffect, useState } from "react";
import Card from './components/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import AutoComplete from './components/Autocomplete';
import Button from '@material-ui/core/Button';
import{ createApi } from "unsplash-js";



const MainDiv= styled.div`
form{
  display:flex;
  flex-direction: column;
}
.btn{
  width:80px;
  margin-top: 5px;
}
`

const Div = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, 300px);
grid-template-rows: repeat(auto-fill, auto);
gap: 33px 20px;
justify-content: center;
align-content: center;
margin-top:30px;

.container{
  margin: auto;
  border: 10px solid #fff;
  border-bottom: 45px solid #fff;
  -webkit-box-shadow: 3px 3px 3px #777;
  -moz-box-shadow: 3px 3px 3px #777;
  box-shadow: 3px 3px 3px #777;
}
`
const Top=styled.div`
display: flex;
justify-content: space-between;
.log_in{
  height: 30px ;
  margin: 10px;
}
`

const api = createApi({
  accessKey: process.env.REACT_APP_ACCESS_KEY,
  secret: process.env.REACT_APP_SECRET_KEY,
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob',
  headers: {
    "Accept-Version": "v1"
  }
});

function App() {
   
  const [search, setSearch] =useState('');
  const [data, setPhotosResponse] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);
   const [option, setOption] = useState([]);
   const [filteredSuggestions, setFilter] =useState([]);

   const startSearch=()=>{
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

   const getRandom=()=>{
    api.photos
    .getRandom({count: 10})
    .then(result => {
      setPhotosResponse(result.response);
      setApiLoaded(true)
    })
    .catch(() => {
      console.log("something went wrong!");
    });
   }

  const handleForm =(event)=>{
    search == '' ?
    getRandom()  :
     event.preventDefault();
    setApiLoaded(false);
      // localStorage.clear()
    for(let key in localStorage){
      if(!localStorage.hasOwnProperty(search) && search){
      localStorage.setItem(search, search);
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
    startSearch()
  }

  useEffect(() => {
    let options = Object.keys(localStorage)
    if(options.length <= 5){
      setOption(options)
    }else{
    setOption(options.slice(options.length - 5))}
    getRandom()
  }, []);

const onChange=(event)=>{
 setSearch(event.target.value);
const filtered = option.filter(
  (option)=>option.toLowerCase().indexOf(search.toLowerCase()) > -1)
  event.target.value == "" ? setFilter(option) : setFilter(filtered); 
}

 function onClickToLi(e){
   setSearch(e.target.innerText)
 }

  return (
    <MainDiv className="App">
      <Top>
     <form onSubmit={handleForm} className="form">
        <AutoComplete
        suggestions={filteredSuggestions}
        onChange={onChange}
        onKeyDown={(event)=>setSearch(event.target.value)}
        value={search}
        onClick={onClickToLi}
        />
        <button className="btn">Search</button>
     </form>
     <Button variant="contained" color="primary" className="log_in">
     Log in
    </Button>
    </Top>
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
     </MainDiv>
  );
}

export default App;


