import { motion, AnimatePresence } from "framer-motion";

import ImageFirstPlaces from '../../assets/RANKING01.png'
import ImageSecondPlaces from '../../assets/RANKING02.png'
import ImageThirdPlaces from '../../assets/RANKING03.png'

import PodionOne from '@/assets/PODIUM01 .png'
import PodionTwo from '@/assets/PODIUM02.png'
import PodionThree from '@/assets/PODIUM03.png'

import ImageshieldOne from '@/assets/ESCUDO01.png'
import ImageshieldTwo from '@/assets/ESCUDO02.png'
import ImageshieldThree from '@/assets/ESCUDO03.png'
import Avatar from '@/assets/Avatar.svg'


import BgList from '../../assets/BG 02.png'

import { useUser } from "@/hooks/useUser";
import { useState } from "react";

export const Hero = () => {

  const { ListPerson, showAnimation, firstPlaces } = useUser()
  const [imgSrc, setImgSrc] = useState(firstPlaces[0]?.urlImage || Avatar);

  return (
    <section className="w-full h-full flex flex-col xl:flex-row justify-center items-start gap-8  md:px-12 2xl:px-32">
      {/* Fogos de artifício */}
      {showAnimation.state && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-40">
          <div className="firework firework1"></div>
          <div className="firework firework2"></div>
          <div className="firework firework3"></div>
        </div>
      )}

      {/* Modal de Animação */}
      <AnimatePresence>
        {showAnimation.state && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-50 h-[20rem] bg-center bg-cover flex flex-col items-center justify-center animate-float"
              style={{
                backgroundImage: `url(${showAnimation.typePlaces === 'first'
                  ? ImageshieldOne
                  : showAnimation.typePlaces === 'second'
                    ? ImageshieldTwo
                    : ImageshieldThree
                  })`
              }}
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {['first', 'second', 'third'].map((place, idx) =>
                showAnimation.typePlaces === place ? (
                  <>
                    <img src={firstPlaces[idx]?.urlImage} className="octagon w-32 h-32 sm:w-44 sm:h-44" alt="" />
                    <p className="text-white text-xl sm:text-2xl font-bold mt-4">{firstPlaces[idx]?.vendedor}</p>
                  </>
                ) : null
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pódio */}
      <div className="w-full xl:w-[55%] min-h-[18rem] md:min-h-[44rem] bg-[#1f1e2b] rounded-3xl flex justify-center items-center gap-6 sm:gap-8 relative bg-cover bg-center py-8 sm:py-0" style={{ backgroundImage: `url(${BgList})` }}>
        {/* 2º Lugar */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-32 sm:w-24 sm:h-40 xl:w-40 xl:h-64 bg-center bg-cover animate-floatSecound flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${ImageshieldTwo})` }}>
            <img
              src={imgSrc}
              onError={() => setImgSrc(Avatar)}
              className={`octagon ${imgSrc === Avatar
                ? 'w-15 h-15 sm:w-20 sm:h-20 xl:w-26 xl:h-28'
                : 'w-15 h-15 sm:w-20 sm:h-20 xl:w-26 xl:h-28'
                } mx-auto mt-2`}
              alt="Imagem"
            />
            <p className="text-white text-xs text-[0.75rem] xl:text-xl text-center font-semibold mt-2">{firstPlaces[1]?.vendedor}</p>
          </div>
          <img src={PodionTwo} className="w-20 xl:w-40 mt-[-0.5rem]" />
        </div>

        {/* 1º Lugar */}
        <div className="relative z-30 flex flex-col items-center">
          <div className="w-25.5 h-40 sm:w-28 sm:h-48 xl:w-48 xl:h-76 bg-center bg-cover animate-float flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${ImageshieldOne})` }}>
            <img
              src={imgSrc}
              onError={() => setImgSrc(Avatar)}
              className={`octagon ${imgSrc === Avatar
                ? 'w-15 h-15 sm:w-20 sm:h-20 xl:w-28 xl:h-30'
                : 'w-15 h-15 sm:w-20 sm:h-20 xl:w-28 xl:h-30'
                } mx-auto mt-2`}
              alt="Imagem"
            />
            <p className="text-white text-[0.75rem] sm:text-base xl:text-2xl text-center font-bold mt-2">{firstPlaces[0]?.vendedor}</p>
          </div>
          <img src={PodionOne} className="w-24 xl:w-52 mt-[-0.5rem]" />
        </div>

        {/* 3º Lugar */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-32 sm:w-24 sm:h-40 xl:w-40 xl:h-64 bg-center bg-cover animate-floatThree flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${ImageshieldThree})` }}>
            <img
              src={imgSrc}
              onError={() => setImgSrc(Avatar)}
              className={`octagon ${imgSrc === Avatar
                ? 'w-15 h-15 sm:w-20 sm:h-20 xl:w-26 xl:h-28'
                : 'w-15 h-15 sm:w-20 sm:h-20 xl:w-26 xl:h-28'
                } mx-auto mt-2`}
              alt="Imagem"
            />
            <p className="text-white text-xs text-[0.75rem] xl:text-xl text-center font-semibold mt-2">{firstPlaces[2]?.vendedor}</p>
          </div>
          <img src={PodionThree} className="w-20 xl:w-40 mt-[-0.5rem]" />
        </div>
      </div>

      {/* Lista de Pessoas */}
      <div className="w-full xl:w-[45%] min-h-[28rem] md:min-h-[44rem] p-4 sm:p-5 xl:p-9 bg-[#1f1e2b] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 xl:gap-7 items-center rounded-4xl bg-cover bg-center" style={{ backgroundImage: `url(${BgList})` }}>
        <AnimatePresence>
          {ListPerson
            .sort((a, b) => Number(b.total_vendas) - Number(a.total_vendas))
            .map((list, index) => {
              const positionImg =
                index === 0 ? ImageFirstPlaces : index === 1 ? ImageSecondPlaces : index === 2 ? ImageThirdPlaces : null;

              return (
                <motion.div
                  key={list.id_vendedor}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  layout
                  className={`w-full min-h-[4rem] px-3 py-4 sm:px-4 sm:py-5 xl:py-8 flex items-center justify-start gap-4 sm:gap-6 rounded-2xl bg-[#5f658a] ${index < 3 ? "shadow-lg" : ""}`}
                >
                  {positionImg ? (
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <motion.img
                        src={positionImg}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1.2 }}
                        transition={{ duration: 0.5, repeat: 2, repeatType: "reverse" }}
                        className="w-7 h-7 sm:w-9 sm:h-9 xl:w-10"
                      />
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-base sm:text-xl xl:text-2xl text-neutral-200 font-semibold">{list.vendedor}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3 sm:gap-4 h-10">
                      <span className="text-white text-base sm:text-lg xl:text-2xl font-semibold">{index + 1}</span>
                      <div className="flex flex-col items-start justify-center">
                        <p className="text-base sm:text-xl xl:text-xl text-neutral-200 font-semibold">{list.vendedor}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </section>


  );
};