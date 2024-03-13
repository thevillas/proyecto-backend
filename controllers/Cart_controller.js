import Cart from "../model/Cart.js";
import User from "../model/usuario.js";


export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id });
        }

        const itemIndex = cart.items.findIndex(p => p.product == productId);

        if (itemIndex > -1) {
            const productItem = cart.items[itemIndex];
            productItem.quantity += quantity;
            cart.items[itemIndex] = productItem;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ mensaje: "No se encontró el carrito" });
        }

        const itemIndex = cart.items.findIndex(p => p.product == productId);

        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ mensaje: "No se encontró el producto en el carrito" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        const user = await User.findById(req.user.id);

        if (!cart) {
            return res.status(404).json({ mensaje: "No se encontró el carrito" });
        }

        // Extrae los nombres de los productos
        const productNames = cart.items.map(item => item.product ? item.product.name : null);

        // Filtra los nombres de los productos para eliminar los valores null
        const filteredProductNames = productNames.filter(name => name !== null);

        res.status(200).json({ user, cart, productNames: filteredProductNames });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
