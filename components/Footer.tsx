import React from 'react'

const Footer = () => {
  return (
    <div className="bg-linear-to-b from-primary to-accent h-[120px] w-screen my-auto flex flex-col mx-auto justify-center items-center">
      <h2 className="text-background font-semibold text-center w-full">
        © 2025 Shrimp Linkers - Made with love by <span className='ml-1 text-primary bg-white rounded-xl px-1'>Starter Up</span>
      </h2>
      <p className="text-background">All Rights Reseved</p>
    </div>
  );
}

export default Footer