const express = require('express');
const router = express.Router()
const Category = require('../../models/Category');
const faker = require('faker');
const { userAuthenticated } = require('../../helpers/authentication');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});


router.get('/', (req, res) => {
    Category.find({}).then(categories => {
        res.render('admin/categories/index', {categories: categories});
    });
});

router.post('/create', (req, res) => {
    const newCategory = new Category({
        name: req.body.name
    });
    newCategory.save().then(savedCategory=>{
        res.redirect('/admin/categories');
    });
    
});

router.get('/edit/:id',(req, res) => {
    Category.findOne({_id: req.params.id}).then(category => {
        res.render('admin/categories/edit', {category: category});
    });

    
});

router.put('/edit/:id', (req, res) => {
    Category.findOne({_id: req.params.id}).then(category => {


        category.name = req.body.name;


        category.save().then(savedCategory => {
            req.flash('success_message', 'Category was successfully updated')
            res.redirect('/admin/categories');
        });
    });


});

router.delete('/:id', (req, res) => {
    Category.findOne({_id: req.params.id})
    .then(category => {
            category.remove();
            req.flash('success_message', "Category was successfully deleted")
            res.redirect('/admin/categories')
    });
});







module.exports = router;