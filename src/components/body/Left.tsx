import React from 'react'
import styles from "./left.module.css"
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
const Left = () => {
  const { data: session } = useSession()
  return (
    // class = "left"
    <div className={styles.left}>
      <div className={styles.left1}>

        <div className={styles.logo}>
          <Image width="64" height="64" src="https://img.icons8.com/laces/64/FFFFFF/twitter.png" alt="twitter" />
        </div>
        <h1>Home</h1>
        <h1>About</h1>
        <h1>Github</h1>
        {session ? (
          <h1 onClick={() => signOut()}>Sign out</h1>
        ) : (
          <h1 onClick={() => signIn()}>Sign in</h1>
        )}

      </div>



    </div>
  )
}

export default Left
