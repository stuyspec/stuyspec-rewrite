import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Subscribe.module.css";
import axios from 'axios';

const Subscribe = () => {

  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [errorMsg, setErrorMsg] = useState(null);

  const subscribe = async (e: any) => {
    e.preventDefault()
    setState('Loading')

    try {
      const response = await axios.post('/api/subscribe', { email })
      console.log(response)
      setState('Success')
      setEmail('')
    } catch (e) {
      console.log(e.response.data.error)
      setErrorMsg(e.response.data.error)
      setState('Error')
    }
  }

  return (
    <>
      <Head>
        <title>Subscribe | The Spectator</title>
        <meta name="description" content="The Stuyvesant Spectator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id={styles.container}>
        <h1 id={styles.heading}>Subscribe</h1>
        <p id={styles.text}>Subscribe to The Spectator's biweekly newsletter!</p>
        <input
          required
          name="email"
          type="email"
          id={styles.input}
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={state === 'Loading'}
          type="submit"
          id={styles.button}
          onClick={subscribe}
        >
            Subscribe
        </button>
      {state === 'Error' && (
        <p id={styles.text}>{errorMsg}</p>
      )}
      {state === 'Success' && (
        <p id={styles.text}>Awesome sauce!!! You've been subscribed!</p>
      )}
    </main>
    </>
  );
};

export default Subscribe;
