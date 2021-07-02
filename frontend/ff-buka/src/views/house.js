import React from 'react';
// import axios from 'axios';
import {Meal} from '../components/homeComponents';

function House(props){
    // const [meals, setMeals] = useState(['timi', 'tobi']);

    // useEffect(props =>{
    //     axios.get('http://localhost:2000/meals/')
    //         .then(data=>{
    //             setMeals(data);
    //         })
    //         .catch(err=>console.log(`Error: ${err}`));
    //     });
    return(<div>
        <Meal />
    </div>);
}

export default House;
