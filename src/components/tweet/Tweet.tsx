import React from 'react'
import Styles from "./tweet.module.css"
import Image from 'next/image'
type TweetProps = {
  username: string;
  likeCount: number;
  retweetCount: number;
  tweetcontent: string,
};

const Tweet: React.FC<TweetProps> = ({ username, likeCount, retweetCount, tweetcontent }) => {
  return (
    <div className={Styles.tweet} >
      <div className={Styles.tweetContent} >

        <div className={Styles.name}>
          <div className={Styles.logo}>
            D
          </div>
          <h3>{username}</h3>
          <p>14 Sep</p>
        </div>
        <div className={Styles.tweetText}>
          {tweetcontent}
        </div>
        <div className={Styles.react}>
          <div className={Styles.likes}>
            {/* <Image width="20" height="20" src="https://img.icons8.com/ios/FFFFFF/50/like--v1.png" alt="like--v1"/> */}
            <p>{likeCount}</p>

          </div>
          <div className={Styles.retweet}>
            {/* <Image width="20" height="20" src="https://img.icons8.com/ios/FFFFFF/50/comments--v1.png" alt="comments--v1"/> */}
            <p>{retweetCount}</p>


          </div>
          <div className={Styles.share}>
            {/* <Image width="20" height="20" src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/forward-arrow.png" alt="forward-arrow"/> */}
            <p>Share</p>
          </div>
        </div>
      </div>
      <hr />
      <div className={Styles.react1}>
        <button className={Styles.reactlike} >Like</button>
        <button className={Styles.reactcomment} >Comment</button>
      </div>
      <div className={Styles.input}>
        <div className={Styles.logo}>
          D
        </div>
        <input className={Styles.input1} placeholder='Write a comment...' type="text" />
        {/* <Image className={Styles.icon} width="24" height="24" src="https://img.icons8.com/material-rounded/24/3E9452/sent.png" alt="sent" /> */}
      </div>
    </div>
  )
}

export default Tweet
