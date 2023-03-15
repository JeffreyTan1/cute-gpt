import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useState } from "react";

const Home: NextPage = () => {
  const response = api.example.hello.useMutation();
  const [input, setInput] = useState("");

  return (
    <>
      <Head>
        <title>CuteGPT</title>
        <meta name="description" content="Cute version of ChatGPT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FFCACA]">
        <div className="flex flex-col items-center justify-center">
          <img src="/totoro.gif" alt="Totoro" className="w-48" />

          {!(response.data || response.isLoading) && (
            <>
              <h1 className="text-[5rem] font-bold text-[#FF00B8]">CuteGPT</h1>
            </>
          )}

          {response.data && (
            <p className="mb-4 max-w-md text-center text-lg font-medium text-[#FF00B8]">
              {response.data.response}
            </p>
          )}

          {!response.isLoading && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                response.mutate({ text: input });
                setInput("");
              }}
            >
              <input
                type="text"
                className="h-12 w-96 rounded-lg border-2 border-[#FF00B8] px-4 text-2xl font-bold text-[#FF00B8]"
                placeholder="Type your question here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
