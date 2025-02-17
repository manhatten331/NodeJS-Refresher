const Product = require('../models/product')

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activePage: req.path,
        editing: false,
        formCSS: true,
        mainCSS: true
    });
};


exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null, title, imageURL, description, price);
    product.save();
    res.redirect('/products')
};

exports.getEditProductPage = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            activePage: req.path,
            editing: editMode,
            product: product,
            formCSS: true,
            mainCSS: true
        });
    })
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageURL;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
    updatedProduct.save()
    res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deletebyId(prodId)
    res.redirect('/admin/products')
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            path: 'admin/products',
            pageTitle: 'Admin Products',
            activePage: req.originalUrl,
            productCSS: true,
            mainCSS: true
        });
    });

}
