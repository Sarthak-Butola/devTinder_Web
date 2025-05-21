
import React from 'react'
import { useSelector } from 'react-redux'

const ConnectionsAccordion = () => {
  const mode = useSelector((store) => store.mode);

  return (
    <div>
      <header className={`flex justify-center text-2xl font-bold mt-2 ${mode ? 'text-white' : 'text-black'}`}>
        <p>Connections:</p>
      </header>

      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className={`
            card card-side shadow-xl animate-pulse duration-50
            mx-auto my-4
            ${mode ? 'bg-neutral-800 border border-gray-700' : 'bg-white border border-gray-300'}
            w-11/12 sm:w-3/4 md:w-1/2
            h-24 sm:h-28 md:h-32
            rounded-lg sm:rounded-xl
            transition-colors duration-500
          `}
        ></div>
      ))}
    </div>
  );
}

export default ConnectionsAccordion;
