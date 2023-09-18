/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Styles from './twitterbody.module.css';
import Tweet from '../tweet/Tweet';
import { useSession, signOut } from 'next-auth/react'; // Import the signOut function
import { useRouter } from 'next/router';

// Define the type for a single tweet
type TweetType = {
  username: string;
  likeCount: number;
  retweetCount: number;
  tweetContent: string;
  profilePicture: string;
};

const TwitterBody = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Destructure the session object
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [tweet, setTweet] = useState('');
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    fetch('/api/tweets')
      .then((response) => response.json())
      .then((data: TweetType[]) => setTweets(data));
  }, []);

  useEffect(() => {
    if (tweet.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [tweet]);

  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const handlePostTweet = () => {
    const username = session?.user?.name;
    const tweetContent = tweet;
    const profilePicture = session?.user?.image;
    const date = new Date();
    const newDate = date.toISOString();
    const res = fetch('/api/tweet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, tweetContent, newDate, profilePicture })
    });
    setTweet('');
    setDisable(true);
    router.reload();
  };

  const handleSignOut = async () => {
    // Use the signOut function to sign the user out
    await signOut();
  };

  return (
    <div className={Styles.body}>
      <div className={Styles.header}>
        <h1>Home</h1>

      </div>
      {session ? (
        <div className={Styles.write}>
          <div className={Styles.writei}>
            <div className={Styles.winner}>
              <img
                src={session?.user?.image!}
                alt="Picture of the author"
                width={50}
                height={50}
              />
              <textarea
                placeholder="What is happening?!"
                className={Styles.input}
                autoComplete="off"
                value={tweet}
                onChange={handleTweetChange}
              />
            </div>
            <div className={Styles.buttons}>
              <button
                className={Styles.tweet}
                disabled={disable}
                onClick={handlePostTweet}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="tweetbody">
        {tweets.map((tweet, index) => (
          <Tweet
            key={index}
            username={tweet.username}
            likeCount={tweet.likeCount}
            retweetCount={tweet.retweetCount}
            tweetcontent={tweet.tweetContent}
            profilePicture={tweet.profilePicture}
          />
        ))}
      </div>
    </div>
  );
};

export default TwitterBody;
