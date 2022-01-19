import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
  //** GET USERNAME AND EMAIL FROM CONTEXT **
  const { auth } = useContext(AuthContext);

  //** GET PRIVATE CONTENT FROM NETWERK REQUEST TO SERVER **
  const [privateContent, setPrivateContent] = useState({
      title: '',
      content: '',
  });

  useEffect(() => {
      const jwt = localStorage.getItem('token');

      const fetchUserDetails = async () => {
          try {
              const result = await axios.get('http://localhost:3000/660/private-content', {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${jwt}`,
                  }
              })

              setPrivateContent({
                  ...privateContent,
                  title: result.data.title,
                  content: result.data.content,
              });
          } catch (e) {
              console.error(e.response);
          }
      }

      fetchUserDetails()
  }, [])

  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {auth.user.username}</p>
        <p><strong>Email:</strong> {auth.user.email}</p>
      </section>
      <section>
        <h2>{privateContent.title}</h2>
        <p>{privateContent.content}</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;