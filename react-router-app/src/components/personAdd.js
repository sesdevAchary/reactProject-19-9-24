import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import notification from './notification'
  const API_URL = process.env.REACT_APP_API_URL;
const personAdd=( {onpersonAdd=()=>{} } )=>{
    const [name , setName]=useState('')
    const [age,setAge]=useState('')
    const navigate=useNavigate();
    const [showNotification,setShowNotification]=useState(null);  // which is a common way to indicate that there is no notification being shown initially. 
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!name || !age) return ; // if either missing, then exit... 

        try{
            const response= await axios.post(API_URL,{name,age});
            const newPersonId = response.data.id; //extract id
            setName('');
            setAge(''); // clears the resetting field

            setShowNotification({type:'success',text:`person is "${response.data.name}" added successfully`});
            setTimeout(() => navigate(`/person/${newPersonId}`), 2000); // Wait for 2 seconds before navigating

        }catch(error){
            console.error('error adding person ',error);
            setShowNotification({type:'error',text:`failed to add`});
        }

    };
    const handleCloseNotification = ()=>{
        setShowNotification(null);
    }
    //console.log(API_URL)//

    return (
        <div className="box-container">
            <h2>Add person </h2>
            <form onSUbmit={handleSubmit} className ="form-cotainer">
               <input  type="text"
                placeholder="name"
                value={name}
                onchage={(e)=>setName(e.target.value)}
                required className="input-field"/>
                <div className = "button-group">
                    <button type="submit" className = "btn btn-add">Add Person</button>
                    <button type="button" className="btn btn-cancel" onClick={() => navigate('/')}>Cancel</button>

                </div>
            </form>
            {showNotification && <notification message = {setShowNotification} onclose={handleCloseNotification}/>}

                </div>
    );
};

export default personAdd;