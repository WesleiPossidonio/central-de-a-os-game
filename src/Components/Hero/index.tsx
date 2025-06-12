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
    <section className="w-full h-full flex justify-center items-start gap-8 px-6 md:px-12 xl:px-20 2xl:px-32">
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

      {/* Pódio */}
      <div className="w-full xl:w-[55%] min-h-[35rem] bg-[#1f1e2b] rounded-3xl flex items-center justify-center gap-8 relative bg-cover bg-center" style={{ backgroundImage: `url(${BgList})` }}>
        {/* Elementos posicionados responsivamente com flex + translate-x removido */}
        {/* 2º Lugar – z-10 */}
        <div className="relative z-10 flex flex-col items-center">
          <div
            className="w-24 h-40 xl:w-40 xl:h-64 bg-center bg-cover animate-floatSecound flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${ImageshieldTwo})` }}
          >
            <img src={firstPlaces[1]?.urlImage} className="octagon w-16 h-16 xl:w-28 xl:h-28 mx-auto mt-2" />
            <p className="text-white text-sm xl:text-xl text-center font-semibold mt-2">{firstPlaces[1]?.name}</p>
          </div>
          <img src={PodionTwo} className="w-20 xl:w-40 mt-[-0.5rem]" />
        </div>

        {/* 1º Lugar – z-30 (em destaque) */}
        <div className="relative z-30 flex flex-col items-center">
          <div
            className="w-28 h-48 xl:w-48 xl:h-76 bg-center bg-cover animate-float flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${ImageshieldOne})` }}
          >
            <img src={firstPlaces[0]?.urlImage} className="octagon w-20 h-20 xl:w-32 xl:h-32 mx-auto mt-2" />
            <p className="text-white text-base xl:text-2xl text-center font-bold mt-2">{firstPlaces[0]?.name}</p>
          </div>
          <img src={PodionOne} className="w-24 xl:w-52 mt-[-0.5rem]" />
        </div>

        {/* 3º Lugar – z-10 */}
        <div className="relative z-10 flex flex-col items-center">
          <div
            className="w-24 h-40 xl:w-40 xl:h-64 bg-center bg-cover animate-floatThree flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${ImageshieldThree})` }}
          >
            <img src={firstPlaces[2]?.urlImage} className="octagon w-16 h-16 xl:w-28 xl:h-28 mx-auto mt-2" />
            <p className="text-white text-sm xl:text-xl text-center font-semibold mt-2">{firstPlaces[2]?.name}</p>
          </div>
          <img src={PodionThree} className="w-20 xl:w-40 mt-[-0.5rem]" />
        </div>

      </div>

      {/* Lista de Pessoas */}
      <div className="w-[45%] min-h-[35rem] p-5 xl:p-9 bg-[#1f1e2b] grid md:grid-cols-2 gap-5 xl:gap-7 items-center rounded-4xl bg-cover bg-center" style={{ backgroundImage: `url(${BgList})` }}>
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
                        className=" w-9 xl:w-20"
                      />

                      <div className="flex flex-col items-start justify-center">
                        <p className="xl:text-2xl text-neutral-200 font-semibold">{list.name}</p>
                        <p className="text-[0.765rem] xl:text-xl font-semibold text-neutral-300">{list.vendas} Pontos</p>
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