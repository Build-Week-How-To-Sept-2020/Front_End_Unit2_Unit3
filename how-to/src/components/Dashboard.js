import React from "react";
import AddHowToForm from "./AddHowToForm";
import HowToCard from "./HowToCard";
import { useState, useEffect, useContext } from "react" ;
import axiosWithAuth from "../utils/axiosWithAuth";
import {GlobalContext} from "../context/GlobalContext";


export default function Dashboard () {
    const {howtos, setHowTos}  = useContext(GlobalContext);
    const [editing, setEditing] = useState(0);
    const [edited, setEdited] = useState({
        title: "",
        contents: ""
    })

   
      let id = localStorage.getItem("id")
  
      useEffect(() => {
      axiosWithAuth().get(`https://joses-how-to-api.herokuapp.com/api/users/${id}/posts`)
            .then(res => 
                
                {setHowTos(res.data)
                console.log(res)
                
                }
            )
            .catch(err => console.log(err))

         }, []);
 

    const toggleEdit = howto => {
        if (editing !== howto.id) {
            setEdited(howto)
            setEditing(howto.id)
        } else {

            axiosWithAuth().put(`https://joses-how-to-api.herokuapp.com/api/users/${id}/posts`, edited)
                .then(res => {
                    setHowTos([...howtos.filter(item => item.id !== howto.id), res.data])
                    setEditing(0);
                })
                .catch(err=> console.log(err))
            
        }
    }

    // const handleChange = e => setEdited({...edited, [e.target.name]: e.target.value});


    // const deleteHowTo = id => {
    //     axiosWithAuth().delete(`https://url.herokuapp.com/howtos/${id}`)
    //         .then(res => setHowtos(howtos.filter(item => item.id !== id)))
    //         .catch(err => console.log(err));
    // } 


    return(
        <div className='dashboard-conatainer'>
            
             <AddHowToForm />
             <div className='card-list-container'>          
                   <HowToCard />
             </div>
            
              
        </div>

    )

}