import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import NewMessageForm from '@/components/NewMessageForm';
import LoginForm from '@/components/LoginForm';
import MessageTable from '@/components/MessageTable';
import { useState, useRef } from 'react';

const RenderFormTable = ({ jsonData }) => {

  const usernameRef = useRef(null);
  const [messages, setMessages] = useState(jsonData);
  const [authenticated, setAuthenticated] = useState(false);

  // called by Formik to pass data from the form
  const addNewMessage = async (values) => {
    // configuration for axios, use bearer token auth
    const axiosReqConfig = {
      url: `${process.env.NEXT_PUBLIC_HOST}/v1/messages/`,
      method: 'post',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      data: values,
    }
    try {
      values.name = usernameRef.current;
      console.log(usernameRef.current);
      const { data } = await axios(axiosReqConfig);
      if (data == 201) {
        setMessages([data.id, ...messages]);
      }
    } catch (error) {
      console.log('API Error: ' + error);
    }
  }

  const logInUser = async (values) => {
    try {
      let username = values.username;
      let password = values.password;
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/v1/login`, {
        username: username,
        password: password
      });
      setAuthenticated(true);
      sessionStorage.setItem('token', data.token);
      const decodedToken = jwtDecode(data.token);
      usernameRef.current = decodedToken.username;
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  // conditional rendering
  // if user is authenticated, renders New Message form
  // if not render login form
  // authenticated is a boolean state hook
  return (
    <>
      {authenticated
        ? <NewMessageForm addNewMessage={addNewMessage} />
        : <LoginForm logInUser={logInUser} />
      }
      <MessageTable messages={messages} />
    </>
  );
};

export default RenderFormTable;


