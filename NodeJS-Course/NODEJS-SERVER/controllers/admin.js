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

    Product.create({
        title: title,
        price: price,
        imageURL: imageURL,
        description: description
    })
        .then(result => {
            console.log("Created Product")
        })
        .catch(err => {
            console.log(err)
        })

    // const product = new Product(null, title, imageURL, description, price);
    // product.save()
    // .then(() => {
    //     res.redirect('/products')
    // })
    // .catch(err => console.log(err));
};

exports.getEditProductPage = async (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;

    if (!editMode) {
        return res.redirect('/');
    }

    try {
        const product = await Product.findByPk(prodId)

        if (!product) {
            return res.redirect('/')
        }

        const plainProduct = product.get({ plain: true })

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            activePage: req.path,
            editing: editMode,
            product: plainProduct,
            formCSS: true,
            mainCSS: true
        });

    } catch (e) {
        console.log(e)
    }

    // Product.findByPk(prodId)
    //     .then(product => {
    //         if (!product) {
    //             return res.redirect('/')
    //         }
    //         res.render('admin/edit-product', {
    //             pageTitle: 'Edit Product',
    //             path: '/admin/edit-product',
    //             activePage: req.path,
    //             editing: editMode,
    //             product: product,
    //             formCSS: true,
    //             mainCSS: true
    //         });
    //     })
    //     .catch(err => console.log(err));

    // Product.findByPk(prodId, product => {
    //     if (!product) {
    //         return res.redirect('/')
    //     }
    //     res.render('admin/edit-product', {
    //         pageTitle: 'Edit Product',
    //         path: '/admin/edit-product',
    //         activePage: req.path,
    //         editing: editMode,
    //         product: product,
    //         formCSS: true,
    //         mainCSS: true
    //     });
    // })
};

exports.postEditProduct = async (req, res, next) => {
    const prodId = req.body.productId
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageURL;
    const updatedDesc = req.body.description;

    // try {
    //     await Product.update(
    //         {
    //             title: updatedTitle,
    //             imageURL: updatedImageUrl,
    //             price: updatedPrice,
    //             description: updatedDesc
    //         },
    //         {
    //             where: { id: prodId }
    //         }
    //     );

    //     res.redirect('/admin/products')
    // } catch {
    //     console.log(err);
    // }

    try {
        const product = await Product.findByPk(prodId)

        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageURL = updatedImageUrl;
        product.description = updatedDesc;

        const result = await product.save();

        console.log(result);

        res.redirect('/admin/products')

        // .then(product => {
        //     product.title = updatedTitle;
        //     product.price = updatedPrice;
        //     product.imageURL = updatedImageUrl;
        //     product.description = updatedDesc;
        //     console.log(typeof product);
        //     console.log(product instanceof Product);
        //     console.log(product)
        //     return product.save();
        // })
        // .then(result => {
        //     console.log(result)
        //     console.log('UPDATED PRODUCT!')
        //     res.redirect('/admin/products')
        // })
        // .catch(err => console.log(err))
    } catch (e) {
        console.log(e);
    }

    // Product.findByPk(prodId)
    //     .then(product => {
    //         product.title = updatedTitle;
    //         product.price = updatedPrice;
    //         product.imageURL = updatedImageUrl;
    //         product.title = updatedDesc;
    //         return product.save();
    //     })
    //     .then(result => {
    //         console.log('UPDATED PRODUCT!')
    //     })
    //     .catch(err => console.log(err))

    // res.redirect('/admin/products')

    // const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
    // updatedProduct.save()
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deletebyId(prodId)
    res.redirect('/admin/products')
};

exports.getProducts = (req, res, next) => {
    Product.findAll({ raw: true })
        .then(products => {
            res.render('admin/products', {
                prods: products,
                path: 'admin/products',
                pageTitle: 'Admin Products',
                activePage: req.originalUrl,
                productCSS: true,
                mainCSS: true
            });
        })
        .catch(err => console.log(err));

}
