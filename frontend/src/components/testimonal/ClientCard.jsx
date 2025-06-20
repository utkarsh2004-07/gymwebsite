import React from 'react';

const ClientCard = ({ image, rating, text, name, profession }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <img src={image} alt="client" className="w-24 h-24 object-cover rounded-full mx-auto mb-4" />
      <div className="flex justify-center mb-4">
        {rating?.map((star, index) => (
          <span key={index} className="text-yellow-500 text-xl">
            <i className={`ri-star${star === 'fill' ? '-fill' : star === 'half' ? '-half-fill' : '-line'}`}></i>
          </span>
        ))}
      </div>
      <p className="text-gray-600 mb-4">{text}</p>
      <h4 className="text-lg font-semibold mb-1">{name}</h4>
      <h5 className="text-gray-500">{profession}</h5>
    </div>
  );
};

export default ClientCard;
