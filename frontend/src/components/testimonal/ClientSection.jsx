import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import ClientCard from './ClientCard';

const clientData = [
  {
    image: 'assets/client-1.jpg',
    rating: ['fill', 'fill', 'fill', 'fill', 'line'],
    text: 'The trainers here customized a plan that balanced my work-life demands, and I\'ve seen remarkable progress in my fitness journey. It\'s not just a gym; it\'s my sanctuary for self-care.',
    name: 'Jane Smith',
    profession: 'Marketing Manager',
  },
  {
    image: 'assets/client-2.jpg',
    rating: ['fill', 'fill', 'fill', 'fill', 'half'],
    text: 'The trainers\' expertise and the gym\'s commitment to cleanliness during these times have made it a safe haven for me to maintain my health and de-stress.',
    name: 'Emily Carter',
    profession: 'Registered Nurse',
  },
  {
    image: 'assets/client-3.jpg',
    rating: ['fill', 'fill', 'fill', 'half', 'line'],
    text: 'The variety of classes and the supportive community have kept me motivated. I\'ve shed pounds, gained confidence, and found a new level of energy to inspire my students.',
    name: 'John Davis',
    profession: 'Teacher',
  },
  {
    image: 'assets/client-4.jpg',
    rating: ['fill', 'fill', 'fill', 'fill', 'fill'],
    text: 'This gym\'s 24/7 access has been a lifesaver. Whether it\'s a late-night workout or an early morning session, the convenience here is unbeatable.',
    name: 'David Martinez',
    profession: 'Entrepreneur',
  },
];

const ClientSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">What People Say About Us?</h2>
      <p className="text-center text-gray-600 mb-8">
        These testimonials serve as a testament to our commitment to helping individuals achieve their fitness goals, and fostering a supportive environment for everyone who walks through our doors.
      </p>
      <div className="relative">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          // Add other Swiper settings as needed
        >
          {clientData.map((client, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <ClientCard
                image={client.image}
                rating={client.rating}
                text={client.text}
                name={client.name}
                profession={client.profession}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientSection;
