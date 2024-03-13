import { Router } from 'express';
import { addToCart , removeFromCart ,getCart  } from '../controllers/Cart_controller.js'; 
import verifyToken from '../middlewares/verifyToken.js';

const route_cart = Router();

route_cart.post('/addcart', verifyToken, addToCart);
route_cart.post('/remove', verifyToken, removeFromCart);
route_cart.get('/getcart', verifyToken, getCart);

export default route_cart;