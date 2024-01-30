import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const SoleLogout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/soleDistributor/logout', {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: 'include',
        }).then((res) => {
          navigate('/soleDistributor/signin', { replace: true });
          if (res.status !== 200) {
            const error = new Error(res.error);
            throw error;
          }
        }).catch((err) => {
          console.log(err);
        });
      }, []);
      

}

export default SoleLogout