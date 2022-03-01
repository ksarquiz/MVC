const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function writeFile(array){
    let string = JSON.stringify(array, null, 4)
    fs.writeFileSync(path.join(__dirname, "../data/productsDataBase.json"), string)
}

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", { products: products })
		// Do the magic
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productEncontrado = products.find(function (product) {
			return product.id == req.params.id
		})

		res.render("detail", { product: productEncontrado })
		// Do the magic
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
		// Do the magic
	},

	// Create -  Method to store
	store: (req, res) => {
		let newProduct = {
			id: products.length +1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.body.image
		}

		products.push(newProduct)

		writeFile(products)

		res.redirect("/products/")
		// Do the magic

	},

	// Update - Form to edit
	edit: (req, res) => {
		let productToEdit = products.find(function (product) {
			return product.id == req.params.id
		})
		res.render("product-edit-form",{product:productToEdit})
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		let productToEdit = products.find(function (product) {
			return product.id == req.params.id
		})
	
		
		productToEdit.name= req.body.name,
		productToEdit.price= req.body.price,
		productToEdit.discount= req.body.discount,
		productToEdit.category= req.body.category,
		productToEdit.description= req.body.description,
		productToEdit.image= req.body.image

		writeFile(products)
		res.redirect("/products/")


		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let productTodelete = products.findIndex(function (product) {
			return product.id == req.params.id
		})

		products.splice(productTodelete, 1)
		writeFile(products)
		res.redirect("/products/")


		// Do the magic
	}
};

module.exports = controller;