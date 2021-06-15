import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

export const LoginForm = () => {
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<string | number | undefined>();

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = () => {
    // validation
    handleFormValidation(email, password);
    console.log(`email`, email);
    console.log(`password`, password);
  };

  const handleFormValidation = (
    email: any,
    password: string | number | undefined
  ) => {
    console.log("validation : ", email, password);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src="https://react.semantic-ui.com/logo.png" /> Log-in to your
          account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button onClick={handleSubmit} color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
