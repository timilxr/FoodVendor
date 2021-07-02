import axios from 'axios';
// import React from 'react';




    // var output = "timi";
    const verifyToken = () => {
        const fetch  = async() => {
            let info = window.localStorage.getItem('E_com');
            if(info){
                info = JSON.parse(info);
                // console.log(info);
                await axios.post('http://localhost:2000/users/verifyy',{token: info}).then(res=>{
                        const output = res.data;
                        // info = "false";
                        if(output === "success"){
                        // console.log('output.success');
                        // setIsAuthenticated(true);
                        return true;
                    }
                    // console.log('pos');
                    // return false;
                }).catch(err=>{
                    console.error(err);
                    console.log('output.failure');
                        // setIsAuthenticated(false);
                        return false;
                });
                // console.log(output);
            }
        }
        let jack = fetch();
        return jack;
}
export default verifyToken;