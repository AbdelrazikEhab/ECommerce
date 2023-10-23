import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { SaveShipping } from "../actions/cartAction.js";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, SetAddress] = useState(shippingAddress.address);
  const [city, SetCity] = useState(shippingAddress.city);
  const [postalcode, SetPostalCode] = useState(shippingAddress.postalcode);
  const [country, SetCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(SaveShipping({ address, city, postalcode, country }));
    history.push("/payment");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="shipping">Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="shipping">
          <Form.Label md="3">Enter your address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter your address"
            value={address}
            required
            onChange={(e) => SetAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="shipping">
          <Form.Label md="3">City</Form.Label>
          <Form.Control
            type="city"
            placeholder="Enter your city"
            value={city}
            required
            onChange={(e) => SetCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="shipping">
          <Form.Label md="3">Postal Code</Form.Label>
          <Form.Control
            type="postalcode"
            placeholder="postalcode"
            value={postalcode}
            required
            onChange={(e) => SetPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="shipping">
          <Form.Label md="3">Country</Form.Label>
          <Form.Control
            type="country"
            placeholder="Country"
            value={country}
            required
            onChange={(e) => SetCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
