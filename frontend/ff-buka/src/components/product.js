import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Rating from './rating';

const Product = ({product, ...rest}) => {
    return (
    <Card key={product._id} className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3'>${product.price}</Card.Text>
        <Card.Text as='p'>${product.description}</Card.Text>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
      </Card.Body>
    </Card>
    )
}

export default Product;