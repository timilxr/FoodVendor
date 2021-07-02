const router = require('express').Router();
const Image = require('./images');
const Meal = require('../models/product.model');
const products = require('../productsData');

router.route('/add').post((req, res)=>{
    Image(req, res, error=>{
        if (error){
            return res.status(400).json("Something went wrong!");
        }
        const image = `/${req.file.path}`;
        const { user, name, category, description, price, countInStock } = req.body;

    const newMeal = new Meal({
        user, name, image, brand, category, description, price, countInStock
    });

    newMeal.save()
    .then(()=>res.json(`new meal ${meal} added successfully!`))
    .catch((err=>{
        res.status(400).json('Error occured while adding the meal, please check and try again');
        console.log(`Error: ${err}`);
    }))
    })
});

router.route('/').get((req, res)=>{
    // console.log(products);
    // Meal.insertMany(products);
    Meal.find()
    .then(meals=>res.json(meals))
    .catch((err=>{
        res.status(400).json('Error occured while loading the meals, please check and try again');
        console.log(`Error: ${err}`);
    }))
});

router.route('/sold').get((req, res)=>{
    Meal.find()
    .then(meals=>{
        meals = meals.filter(meal=>meal.soldQuantity>=1);
        const msg = meals.length>0? meals: 'no meals sold yet';
        res.json(msg);
    })
    .catch((err=>{
        res.status(400).json('Error occured while loading sold meals, please check and try again');
        console.log(`Error: ${err}`);
    }))
});

router.route('/available').get((req, res)=>{
    Meal.find()
    .then(meals=>{
        meals = meals.filter(meal=>meal.soldQuantity < meal.quantity);
        const msg = meals.length>0? meals: 'no meals sold yet';
        res.json(msg);
    })
    .catch((err=>{
        res.status(400).json('Error occured while loading sold meals, please check and try again');
        console.log(`Error: ${err}`);
    }))
});

router.route('/:id').get((req, res)=>{
    Meal.findById(req.params.id)
    .then(meals=>{
        const meal = meals[0];
        res.json(meal);
    })
    .catch((err=>{
        res.status(400).json('Error occured while loading the meals, please check and try again');
        console.log(`Error: ${err}`);
    }))
});

router.route('/:id').delete((req, res)=>{
    Meal.findByIdAndDelete(req.params.id)
    .then(res.json('meal deleted successfully'))
    .catch((err=>{
        res.status(400).json('Error occured while deleting the meal, please check and try again');
        console.log(`Error: ${err}`);
    }))
});

router.route('/:id').post((req, res)=>{
    const { user, name, image, brand, category, description, price, countInStock } = req.body;
    Meal.findById(req.params.id)
    .then(mainMeal=>{
        mainMeal.user = user;
        mainMeal.name = name;
        mainMeal.image = image;
        mainMeal.brand = brand;
        mainMeal.category = category;
        mainMeal.description = description;
        mainMeal.price = price;
        mainMeal.countInStock = countInStock;

        mainMeal.save()
        .then(res.json(`meal ${mainMeal.meal} has been updated successfully`))
        .catch((err=>{
            res.status(400).json('Error occured while updating the meal, please check and try again');
            console.log(`Error: ${err}`);
        }));
    })
    .catch((err=>{
        res.status(400).json('Error occured while loading the meals, please check and try again');
        console.log(`Error: ${err}`);
    }))
});

module.exports = router;