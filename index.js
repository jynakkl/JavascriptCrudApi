const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const app = express();
app.use(express.json());

app.listen(3000,() => {
    console.log("Server is running on 3000 port");
});

app.get("/api/products", async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
});

app.get("/api/products/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
});

app.post("/api/products", async (req,res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
});

app.put("/api/product/:id",async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product) {
            return res.status(200).json({message : "Product not found"});
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    } catch (error) {
        console.log(error);
    }
});

app.delete("/api/product/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(200).json({message : "Product not found"});
        }
        return res.status(200).json({message : "Product deleted successfully"});
    } catch (error) {
        console.log(error);
    }
});

app.get("/",(req,res) => {
    res.send("Hello from Node API");
});

mongoose.connect("mongodburl")
.then(() => {
    console.log("Connection successful");
})
.catch((error) => console.log(error));