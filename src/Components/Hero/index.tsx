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


import BgList from '../../assets/BG 02.png'

import { useUser } from "@/hooks/useUser";

export const Hero = () => {
  const { ListPerson, showAnimation, firstPlaces } = useUser()

  return (
    <section className="w-full h-full rounded-2xl flex justify-center items-start gap-7 px-80">
      {/* Fogos de artifício */}
      {showAnimation.state && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
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
            {

            }
            <motion.div
              className="w-80 h-[32rem] bg-center bg-cover flex flex-col items-center justify-center animate-float"
              style={{
                backgroundImage: `url(${showAnimation.typePlaces === 'first' &&
                  ImageshieldOne || showAnimation.typePlaces === 'second' && ImageshieldTwo || showAnimation.typePlaces === 'third' && ImageshieldThree})`
              }}
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              {
                showAnimation.typePlaces === 'first' && (
                  <>
                    <img src={firstPlaces[0]?.urlImage} className="octagon w-44 h-44" alt="" />
                    <p className="text-white text-2xl font-bold mt-4">{firstPlaces[0]?.name}</p>
                  </>
                ) || showAnimation.typePlaces === 'second' && (
                  <>
                    <img src={firstPlaces[1]?.urlImage} className="octagon w-44 h-44" alt="" />
                    <p className="text-white text-2xl font-bold mt-4">{firstPlaces[1]?.name}</p>
                  </>
                ) || showAnimation.typePlaces === 'third' && (
                  <>
                    <img src={firstPlaces[2]?.urlImage} className="octagon w-44 h-44" alt="" />
                    <p className="text-white text-2xl font-bold mt-4">{firstPlaces[2]?.name}</p>
                  </>
                )
              }

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      <div className="w-[52%] h-[35rem] xl:h-[65rem] bg-[#1f1e2b] 
        rounded-4xl bg-center bg-cover relative perspective-[1000px]" style={{ backgroundImage: `url(${BgList})` }}>
        <div className="w-full relative mt-[22rem] xl:mt-[45%] flex items-center 
          transform translate-z-[15rem] translate-x-[9.6rem] xl:translate-z-[-40rem] xl:translate-x-[5rem]">

          <div className=" flex xl:-ml-18 flex-col items-center absolute -left-32 xl:-left-86">
            <div className="w-21 h-34 xl:w-[33rem] xl:h-[53rem] bg-center bg-cover flex flex-col items-center gap-3 justify-center animate-floatSecound" style={{ backgroundImage: `url(${ImageshieldTwo})` }}>
              <img src={firstPlaces[1]?.urlImage} className="octagon w-14 h-14 xl:w-56 xl:h-56" alt="" />
              {
                <p className="text-white text-xl xl:text-3xl font-semibold">{firstPlaces[1]?.name}</p>
              }
            </div>
            <div className="absolute bottom-0 w-[90%] h-[26%] rounded-full opacity-50 bg-white blur-md animate-vapor"></div>
            <img className="w-[8rem]  xl:w-[35rem]" src={PodionTwo} alt="" />
          </div>

          <div className=" flex flex-col items-center absolute left-[6rem] xl:left-0 xl:right-[-75.2rem]">
            <div className="w-21 h-34 xl:w-[33rem] xl:h-[53rem] bg-center bg-cover flex flex-col items-center 
              justify-center gap-3  animate-floatThree" style={{ backgroundImage: `url(${ImageshieldThree})` }}>
              <img src={firstPlaces[2]?.urlImage} className="octagon w-14 h-14 xl:w-56 xl:h-56" alt="" />
              <p className="text-white text-xl xl:text-3xl font-semibold">{firstPlaces[2]?.name}</p>
            </div>
            <div className="absolute bottom-0  w-[26%] h-[26%] rounded-full opacity-50 bg-white blur-md animate-vapor"></div>
            <img className="w-[8rem]  xl:w-[40rem]" src={PodionThree} alt="" />
          </div>
        </div>

        {/* 1º Lugar - Centro e mais na frente */}
        <div className="absolute bottom-2 flex flex-col items-center text-white 
          transform translate-z-[-4.5rem] translate-x-[50.3%] xl:translate-z-[-4.8rem] xl:translate-x-[96.6%]">
          <div className=" w-36 h-56 xl:w-[31rem] xl:h-[50rem] flex flex-col items-center justify-center 
            gap-3 bg-center bg-cover animate-float" style={{ backgroundImage: `url(${ImageshieldOne})` }}>
            <img src={firstPlaces[0]?.urlImage} className="octagon w-19 h-19 xl:w-56 xl:h-56" alt="" />
            <p className="text-white text-xl xl:text-3xl font-semibold">
              {firstPlaces[0]?.name}
            </p>
          </div>
          <div className="absolute bottom-8 w-[90%] h-[26%] rounded-full opacity-50 bg-white blur-md animate-vapor"></div>
          <img className=" w-[13rem] xl:w-[30rem]" src={PodionOne} alt="" />
        </div>

        {/* 3º Lugar - Direita e mais no fundo */}

      </div>

      <div className="w-[45%] h-[35rem] xl:h-[65rem] p-5 xl:p-9 bg-[#1f1e2b] grid md:grid-cols-2 gap-5 xl:gap-7 items-center rounded-4xl bg-cover bg-center" style={{ backgroundImage: `url(${BgList})` }}>
        <AnimatePresence>
          {ListPerson
            .sort((a, b) => Number(b.vendas) - Number(a.vendas))
            .map((list, index) => {
              const positionImg =
                index === 0 ? ImageFirstPlaces : index === 1 ? ImageSecondPlaces : index === 2 ? ImageThirdPlaces : null;

              return (
                <motion.div
                  key={list.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  layout
                  className={`w-full min-h-[5rem] px-4 py-5 xl:py-8 flex items-center justify-start gap-6 rounded-2xl bg-[#5f658a] ${index < 3 ? "shadow-lg" : ""
                    }`}
                >
                  {positionImg && (
                    <div className="flex items-center justify-center gap-4">
                      <motion.img
                        src={positionImg}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1.2 }}
                        transition={{ duration: 0.5, repeat: 2, repeatType: "reverse" }}
                        className=" w-9 xl:w-26"
                      />

                      <div className="flex flex-col items-start justify-center">
                        <p className="xl:text-3xl text-neutral-200 font-semibold">{list.name}</p>
                        <p className="text-[0.765rem] xl:text-2xl font-semibold text-neutral-300">{list.vendas}</p>
                      </div>
                    </div>
                  )}

                  {
                    !positionImg && (
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-white text-lg xl:text-2xl font-semibold" >{index + 1}</span>
                        <div className="flex flex-col items-start justify-center">
                          <p className="xl:text-xl text-neutral-200 font-semibold"> {list.name} </p>
                          <p className="text-[0.765rem] xl-text- font-semibold text-neutral-300">{list.vendas}</p>
                        </div>
                      </div>
                    )
                  }

                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>
    </section>
  );
};
