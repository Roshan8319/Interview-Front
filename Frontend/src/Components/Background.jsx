import React from 'react';
import Bg from '../assets/bg.jpg'

function Background() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="flex items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold">Welcome to My Website</h1>
      </div>
    </div>
  );
}

export default Background;
