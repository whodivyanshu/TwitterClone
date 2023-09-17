import React, { useState, useEffect } from 'react';
import Styles from './twitterbody.module.css';
import Image from 'next/image';
import Tweet from '../tweet/Tweet';

// Define the type for a single tweet
type TweetType = {
  username: string;
  likeCount: number;
  retweetCount: number;
  tweetContent: string;
};

const TwitterBody = () => {
  const [tweets, setTweets] = useState<TweetType[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/tweets')
      .then((response) => response.json())
      .then((data: TweetType[]) => setTweets(data));
  }, []);

  return (
    <div className={Styles.body}>
      <div className={Styles.header}>
        <h1>Home</h1>
      </div>
      <div className="tweetbody">
        {tweets.map((tweet, index) => (
          <Tweet
            key={index}
            username={tweet.username}
            likeCount={tweet.likeCount}
            retweetCount={tweet.retweetCount}
            tweetcontent={tweet.tweetContent}
          />
        ))}
      </div>
    </div>
  );
};

export default TwitterBody;
