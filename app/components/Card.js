// Card in Tailwind Design
import React from 'react';
import Image from 'next/image';


export default function Card({ title, children }) {
    // equal height in flex container
    return (
        <div className="flex flex-col flex-grow items-center justify-items-center p-2 md:p-4 rounded-lg shadow-md border-gray-200 border-4 border border-double hover:border-solid hover:cursor-pointer h-full">
            <h2 className="md:text-xl">{title}</h2>
            {children}
        </div>
    );
}
