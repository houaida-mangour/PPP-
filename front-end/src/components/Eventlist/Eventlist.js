import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';import 'swiper/css'; 
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css/navigation";
import robolyImage from './roboly.jpg';
import forumImage from './forum.jpg';
import nrwImage from './nrw.jpeg';
import tcpcImage from './TCPC.jpg';
import chessImage from './chess.jpg';
import jtiImage from './jti.jpg';
import './Eventlist.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Eventlist() {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="image relative">
            <img src={robolyImage} alt='RobOlympiX INSAT 2024' />
            <div className='space-y-5 title-content absolute top-[25%] left-[8rem]'>
              <h3 className='text-[30px] font-[700] '>RobOlympiX INSAT 2024</h3>
              <p className='text-[14px] '> Congratulations to the Aerobotix Club for brilliantly orchestrating 
              the second edition of RobOlympix, which took place4 at INSAT on 
              March 30th and 31st, 2024. This competition was a true success!</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image relative">
            <img src={forumImage} alt='Forum INSAT Entreprise' />
            <div className='space-y-5 title-content absolute top-[25%] left-[8rem]'>
              <h3 className='text-[30px] font-[700] '>Forum INSAT Entreprise 2023</h3>
              <p className='text-[14px] '>November 16, 2022
                The INSAT Business Forum is a true success in terms of INSAT's openness to its socio-economic environment.
                Thirty-two companies were present..</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image relative">
            <img src={nrwImage} alt='NRW 5.0' />
            <div className='space-y-5 title-content absolute top-[25%] left-[8rem]'>
              <h3 className='text-[30px] font-[700] '>NRW 5.0</h3>
              <p className='text-[14px] '>The 5th edition of NRW, organized by the IEEE RAS INSAT Student
             Branch Club, was held from June 23rd to 25th.This year, the central theme of NRW was "Artificial Intelligence for Robotics".
             his exciting event took place from June 23rd to 25th, 2023, in Tunis, gathering 320 engineering students from various 
             higher education institutions.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image relative">
            <img src={tcpcImage} alt='TCPC' />
            <div className='space-y-5 title-content absolute top-[25%] left-[8rem]'>
              <h3 className='text-[30px] font-[700] '>TCPC 2023</h3>
              <p className='text-[14px] '>the oldest, most prestigious, and most significant of all computer programming competitions
              This edition took place on June 24th and 25th, 2023, at the Hotel El Mouradi Club Kantaoui and hosted 90 teams.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="image relative">
            <img src={chessImage} alt='CHESS' />
            <div className='space-y-5 title-content absolute top-[25%] left-[8rem]'>
              <h3 className='text-[30px] font-[700] '> Chess tournament</h3>
              <p className='text-[14px] '>May 5th,2023 The Chess Enthusiasts Club at INSAT organized a tournament supported by Barnas 
              Meubles, showcasing the skills and abilities of the 32 participating players. The objective of this event is to create a 
              memorable and exciting experience for all participants.</p>
            </div>
          </div>
          
        </SwiperSlide>

        <SwiperSlide>
          <div className="image relative">
            <img src={jtiImage } alt='JTI' />
            <div className='space-y-5 title-content absolute top-[25%] left-[8rem]'>
              <h3 className='text-[30px] font-[700] '>JTI 2023</h3>
              <p className='text-[14px] '>In the shadow of the stage illuminated by a thousand lights, lies a 
              dedicated and hardworking crew hailing from the "Théätro INSAT" club, talented youth who distinguished themselves by 
              giving this seventh edition of the JTI a special place in the heart of every traveler.</p>
            </div>
          </div>
        </SwiperSlide>



      </Swiper>
      
    </div>
  );
}

export default Eventlist;
