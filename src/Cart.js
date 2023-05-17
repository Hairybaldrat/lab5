import Items from './Items.json'
import React, { useState } from 'react'
import SearchBar from './Search.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default function Item() {

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  function handleAddToCart(item) {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index === -1) {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    } else {
      cartItems[index].quantity++;
      setCartItems(cartItems);
    }
    setCartTotal(cartTotal + item.Price);
  }


  function handleRemoveFromCart(item) {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (cartItems[index].quantity <= 0) {
      return;
    } else {
      cartItems[index].quantity--;
      if (cartItems[index].quantity === 0) {
        cartItems.splice(index, 1);
      }
      setCartItems(cartItems);
    }
    setCartTotal(cartTotal - item.Price);
  }

  return <Container >
    <Row >
      <Col>
        <SearchBar handleAddToCart={handleAddToCart}></SearchBar >
      </Col>
      <Col>
        <div className="grid-container"> {
          Items.map(item => {
            return (
              <div className="box " key={item.id}>
                <strong>{item.Name}</strong>
                <img className="ItemImage" src={"/Images/" + item.Itemurl} alt={item.Name}></img>
                <p>${item.Price}</p>
                <button onClick={() => handleAddToCart(item)}>Add to cart</button>
              </div >
            )
          })
        }
        </div>
      </Col>
      <Col>

        <div className="Cart">
          <h1>Cart</h1>
          <ul>
            {cartItems.map((item) => (<li key={item.id}>{item.Name + " Amount " + item.quantity}<button onClick={() => handleRemoveFromCart(item)}> Remove </button></li>))}
          </ul>
          <h2>Total: <b>${cartTotal}</b></h2>
        </div>
      </Col>
    </Row >
  </Container >
}