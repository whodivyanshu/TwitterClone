/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import styles from './left.module.css';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Left = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const email = session?.user?.email;
      const name = session?.user?.name;
      const image = session?.user?.image;
      const res = fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, image })
      });
    }
  }, [session]);

  const handleSignIn = async () => {
    await signIn();
  }

  return (
    <div className={styles.left}>
      <div className={styles.left1}>
        <div className={styles.logo}>
          <img width="64" height="64" src="https://img.icons8.com/laces/64/FFFFFF/twitter.png" alt="twitter" />
        </div>
        <h1>Home</h1>
        <h1>About</h1>
        <Link href="http://github.com/whodivyanshu/TwitterClone" target='_blank'>
          <h1>Github</h1>
        </Link>
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