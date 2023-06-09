const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Users = require('../models/Users');
let quantity=1;

const getAll = catchError(async(req, res) => {

    const results = await Cart.findAll({
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
    const userId = req.user.id;
    const productId = req.body.productId;
    

    // Verificar si el producto ya está en algún carrito existente
    const existingCart = await Cart.findOne({
        include: [{ model: Product, where: { id: productId } }]
    });

    if (existingCart) {
        // Si el producto ya existe en algún carrito, aumentar la cantidad del carrito existente
        const quantity = (existingCart.quantity + 1);
        await existingCart.update({ quantity });
        return res.json({ cart: existingCart, message: "Product quantity increased in Cart"+" "+quantity });
    } else {
        // Si el producto no existe en ningún carrito, crear un nuevo carrito y agregar el producto
        const newCart = await Cart.create({ userId });
        await newCart.addProduct(productId);
        const quantity = 1;
        await newCart.update({ quantity });
        return res.status(201).json({ cart: newCart, message: "Create a New Cart with Product" });
    }
});


const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Cart.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const productId = req.body.productId;
// Verificar si el producto ya está en algún carrito existente
    const cart = await Cart.findOne({
        include: [{ model: Product, where: { id: productId } }]
    });


    if (!cart) {
      return res.status(404).json({ message: "Cart not found Product Id="+" "+productId });
    }
  
    // Eliminar el producto del carrito utilizando el método removeProduct() generado por Sequelize
    quantity=cart.quantity;
    quantity--;
    await cart.update({ quantity });

  
    if (quantity === 0) {
      // Si el carrito está vacío, eliminarlo
      quantity=1;
      await cart.destroy();
      return res.sendStatus(204);
    }
  
    return res.json(cart).sendStatus(200);
  });
  

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Cart.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});




module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}