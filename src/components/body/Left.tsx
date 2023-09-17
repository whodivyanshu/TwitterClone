// Import necessary dependencies
import React from 'react';
import styles from './left.module.css';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

const Left = () => {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    try {
      await signIn(); // Replace 'your-auth-provider' with your actual provider
      const email = session?.user?.email;
      const name = session?.user?.name;
      const image = session?.user?.image;
      console.log(session?.user)
      console.log(email, name, image);

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, image }),
      });

      if (response.status === 200) {
        console.log('User created successfully');
      } else if (response.status === 400) {
        console.log('User already exists');
      } else {
        console.error('Error creating user');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className={styles.left}>
      <div className={styles.left1}>
        <div className={styles.logo}>
          Twitter
        </div>
        <h1>Home</h1>
        <h1>About</h1>
        <h1>Github</h1>
        {session ? (
          <h1 onClick={async () => {
            try {
              await signOut();
            } catch (error) {
              console.error('Error during sign-out:', error);
            }
          }}>Sign Out</h1>
        ) : (
          <h1 onClick={handleSignIn}>Sign in</h1>
        )}
      </div>
    </div>
  );
};

export default Left;
