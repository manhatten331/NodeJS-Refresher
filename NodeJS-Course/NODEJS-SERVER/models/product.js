const rootDir = require('../util/path')
const db = require('../util/database')

const Cart = require('./cart')

// const p = path.join(rootDir, 'data', 'products.json');

// const getProductsFromFile = (cb) => {
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             return cb([]);
//         }
//         cb(JSON.parse(fileContent));
//     })
// }

module.exports = class Product {
    constructor(id, title, imageURL, description, price) {
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }

    save() {
        // getProductsFromFile(products => {
        //     if (this.id) {
        //         const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        //         const updatedProducts = [...products];
        //         updatedProducts[existingProductIndex] = this;
        //         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        //             console.log(err);
        //         })
        //     } else {
        //         this.id = Math.random().toString();
        //         products.push(this);
        //         fs.writeFile(p, JSON.stringify(products), err => {
        //             console.log(err);
        //         })
        //     }
        // })
        return db.execute("INSERT INTO products (title, price, description, imageURL) VALUES (?, ?, ?, ?)",
            [this.title, this.price, this.description, this.imageURL]
        )
    }

    static deletebyId() {
        // getProductsFromFile(products => {
        //     const product = products.find(prod => prod.id === id)
        //     const updatedProduct = products.filter(prod => prod.id !== id);
        //     fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        //         if (!err) {
        //             Cart.deleteProduct(id, product.price)
        //         }
        //         console.log(err);
        //     })
        // })
    }

    static fetchAll() {
        // getProductsFromFile(cb);
        return db.execute('SELECT * FROM PRODUCTS')
    }

    static findById(id) {
        // getProductsFromFile(products => {
        //     const product = products.find(p => p.id === id);
        //     cb(product)
        // })
        return db.execute("SELECT * FROM products WHERE products.id = ?", [id])
    }
}