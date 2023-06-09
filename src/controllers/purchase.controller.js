const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart =require('../models/Cart');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: Product, // Incluye el modelo Product
          },
        ],
      });
    
      return res.json(results);
});
const create = catchError(async (req, res) => {
    const userId = req.user.id; // Obtener el ID del usuario autenticado
    let quantityTotal = 0;
  
    // Obtener los productos del carrito del usuario logeado a "Purchase"
    const carts = await Cart.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product, // Incluye el modelo Product
        },
      ],
    });
  
    if (carts && carts.length > 0) {
      // Verificar si hay carritos y obtener las cantidades de los productos
      const quantities = [];
      carts.forEach((cart) => {
        quantityTotal += cart.quantity;
        cart.products.forEach((product) => {
          quantities.push({
            productId: product.id,
          });
        });
      });
  
      const newPurchase = await Purchase.create({ userId, quantity: quantityTotal });
      quantities.forEach((element) => {
        newPurchase.addProduct(element.productId);
      });
  
      const purchases = await Purchase.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: Product, // Incluye el modelo Product
          },
        ],
      });
  
      await Cart.destroy({ where: { userId: req.user.id } });
  
      return res.json({ purchases, quantityTotal });
    } else {
      return res.status(401).json({ message: "No Exist Carts Associate to Login User" });
    }
  });
  
  
  
  
  
  
  
  

module.exports = {
    getAll,
    create
}