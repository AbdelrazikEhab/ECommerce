import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { SavePayment } from "../actions/cartAction.js";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, SetPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(SavePayment(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="Payment">Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="Payment">
          <Form.Label>Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="PaymentMethod"
              value="PayPal"
              checked
              onChange={(e) => SetPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="PaymentMethod"
              value="Stripe"
              checked
              onChange={(e) => SetPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
