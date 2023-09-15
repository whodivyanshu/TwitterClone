import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Left from "@/components/body/Left";
import Right from "@/components/body/Right";
import TwitterBody from "@/components/twittermid/TwitterBody";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.home}>
      <Left />
      <TwitterBody />
      <Right />
    </div>
  );
}
