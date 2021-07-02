const router = require('express').Router();
const PreOder = require('../models/preorder.model');

router.route('/add').post((req, res)=>{
    const meal = req.body.meal;
    const quantity = 1;

    const newPre = new PreOder({
        meal, quantity
    });
    newPre.save()
    .then(()=>res.json('Item Added to cart'))
    .catch(err=>{
        res.status(400).json('Could not add item to cart, try again');
        console.log(`Error: ${err}`);
    });
})

router.route('/').get((req, res)=>{
    
    PreOder.findById(req.params.id)
    .then((data)=>res.json(data))
    .catch(err=>{
        res.status(400).json('Could not retrieve items in cart, try again');
        console.log(`Error: ${err}`);
    });
})

router.route('/:id').delete((req, res)=>{
    
    PreOder.findByIdAndDelete(req.params.id)
    .then(()=>res.json('deleted'))
    .catch(err=>{
        res.status(400).json('Could not delete items in cart, try again');
        console.log(`Error: ${err}`);
    });
})

module.exports = router;