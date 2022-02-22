import Product from "../models/Product"

export const createProduct = async (req, res) =>{
    const {name, category, price, imgUrl} = req.body
    
    const newProduct = new Product({name, category, price, imgUrl})
    
    const productSaved = await newProduct.save()
    
    res.status(201).json(productSaved)
}

export const getProducts = async (req, res) => {
   const products = await Product.find()
   res.json(products)
}

export const getProductById = async (req, res) =>{
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product)
}

export const udpateProductById = async (req, res) =>{
    try{
        const {productId} = req.params
        const product = await Product.findByIdAndUpdate(
            productId, 
            req.body,
            {
                new: true
            })
        res.status(200).json(product)
    }
    catch(error){
        res.status(404).json({message: "Product not found"})
    }
}

export const deleteProductById = async(req, res) =>{

    const {productId} = req.params
    await Product.findByIdAndDelete(productId)
    res.status(204).json()

}