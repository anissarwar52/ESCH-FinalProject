import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const DisLogout = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        fetch('/distributor/logout',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:'include'
        }).then((res)=>{
            navigate('/distributor/signin',{replace:true})
            if(!res.status === 200){
                const error = new Error(res.error)
                throw error
            }
        }).catch((err)=>{
            console.log(err)
        })
    })

}

export default DisLogout