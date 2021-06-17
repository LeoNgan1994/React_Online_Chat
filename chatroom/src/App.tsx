import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { RegisterPage, SigninPage } from "./pages";
import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";

import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message,
  Image,
} from "semantic-ui-react";

// init firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8UFp6aHpV_MUogO6uWcl_lX0VmFA34Jo",
  authDomain: "realtimechat-ccb49.firebaseapp.com",
  projectId: "realtimechat-ccb49",
  storageBucket: "realtimechat-ccb49.appspot.com",
  messagingSenderId: "612385279668",
  appId: "1:612385279668:web:0853f9addc6502d25b91e1",
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user, setUser] = useState<any>(null);

  function handleLogin(email: any, pass: any) {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(`user`, user);

        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  return (
    <div className="App">
      {/* <section>{user ? <ChatRoom /> : <Signin />}</section> */}
      <section>
        {user ? <ChatRoom /> : <Signin handleLogin={handleLogin} />}
      </section>
    </div>
  );
}

type SigninProps = {
  handleLogin: (email: any, password: any) => void;
};

const Signin = ({ handleLogin }: SigninProps) => {
  const [email, setEmail] = useState<any>();
  const [pass, setPass] = useState<string>("");

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
                setPass(e.target.value);
              }}
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button
              onClick={() => handleLogin(email, pass)}
              color="teal"
              fluid
              size="large"
            >
              Login
            </Button>
          </Segment>
        </Form>
        {/* <Message>
          New to us? <a href="#">Sign Up</a>
        </Message> */}
      </Grid.Column>
    </Grid>
  );
};

const Logout = () => {};

const ChatRoom = () => {
  const msgRef = firestore.collection("messages");
  const query = msgRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(`messages`,messages)

  const [formValue, setFormValue] = useState<string>("");

  const sendMsg = async (e: any) => {
    e.preventDefault();
    const currentUser: any | null = auth.currentUser;
    const { uid, photoURL } = currentUser;
    console.log(uid,photoURL,formValue);

    await msgRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => <ChatMsg key={msg.id} message={msg} />)}
      </div>
      <form onSubmit={sendMsg}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit"> submit</button>
      </form>
    </>
  );
};

interface Props {
  // any props that come into the component
  key: string;
  message: any;
}

const ChatMsg: React.FC<Props> = ({ key, message }) => {
  const currentUser: any | null = auth.currentUser;
  const { text, uid, photoUrl } = message;
  const messageClass = uid === currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoUrl} />
      <p>{text}</p>
    </div>
  );
};

export default App;
