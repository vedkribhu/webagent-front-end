'use client';
import Image from "next/image";
import { useState } from "react";
import Container from './components/Container';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const onSubmit = async () => {
    const response = await fetch('https://d044ae62-7576-40c3-9aa1-860c241d7bb9.mock.pstmn.io/runagent', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      },
    });
    
    // reponse will be a list of image base64 strings
    const { result } = await response.json();
    console.log(result);
    // visualize the images
    const image = document.createElement('img');
    image.src = `data:image/png;base64,${result[0]}`;
    document.body.appendChild(image);
    };

    
    // run the python script with the prompt as an argument


  return (
    <Container />
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
    //     <form className="flex flex-col w-full" onSubmit={(e) => {
    //           // alert("Submit button clicked");
    //           onSubmit();
    //           e.preventDefault();
    //           e.stopPropagation();
    //         }}>
    //       <input
    //         type="text"
    //         className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
    //         placeholder="Enter a prompt to run in the web agent"
    //         onChange={(e) => {
    //           setPrompt(e.target.value);
    //         }}
    //       />

    //       <button className="p-2 mt-4 bg-blue-500 text-white rounded-md"
    //         type="submit"
    //       >
    //         Submit
    //       </button>

    //       <button className="p-2 mt-4 bg-gray-300 text-gray-600 rounded-md">
    //         Stop
    //       </button>

    //       <button className="p-2 mt-4 bg-gray-300 text-gray-600 rounded-md">
    //         Redo
    //       </button>
    //     </form>

    //   </div>
    // </main>
  );
}
