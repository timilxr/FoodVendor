import React, {useEffect, useContext} from 'react';
import { MealsDispatchContext, getMeals, MealsStateContext } from '../contexts/products';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/product';

const Home = () => {
    const {meals, loading, loaded} = useContext(MealsStateContext);
    const dispatch = useContext(MealsDispatchContext);
    useEffect(() =>{
        getMeals(dispatch);
        },[dispatch]);
  
    return(
        <div>
            { loading ?
            <div>
            <h1>Loading...</h1>
            </div>
            :
            <div>
                {(loaded && meals) ?
                <Row>
                {meals.map(meal =>
                <Col key={meal._id} sm={6} md={6} lg={4} xl={3}>
                    <Product product={meal} />
                </Col>
                )}
                </Row>
                :
                <h1>No meals available at the moment</h1>}
                
            </div>
            }
            
        </div>
    );
};

export default Home;