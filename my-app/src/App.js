import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NonProfitForm from './NonProfitForm';
import axios from 'axios';


function App() {
    const [posts, setPosts] = useState([]);

    async function fetchAllPosts(){ //async uses an await call (non blocking, allows front end to run other things if needed)
        try {
           const response = await axios.get('http://localhost:8000/posts');
           return response.data;  
        }
        catch (error){
           //We're not handling errors. Just logging into the console.
           console.log(error); 
           return false;         
        }
    }

    async function makePostCall(post){
        try {
            const response = await axios.post('http://localhost:8000/posts', post);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    async function makeUserCall(user){
        try {
            const response = await axios.post('http://localhost:8000/users', user);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    function updateList(post) { //only update if POST call is successful (depending on backend)
        makePostCall(post).then( result => {
        if (result && result.status === 201)
           setPosts([...posts, result.data] );
        });
    }

    //hook to be called only when we render for the first time
    useEffect(() => {
        fetchAllPosts().then( result => {
           if (result)
              setPosts(result);
         });
    }, [] );
        
    return ( //can only return 1 div or as a parent with sub divs
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" />
                <Route path="/partner-form" element={<NonProfitForm posts={posts} />} />
            </Routes>
            </BrowserRouter> 
        </div>
    ); 
}

export default App; //makes the component available to be imported to other modules
