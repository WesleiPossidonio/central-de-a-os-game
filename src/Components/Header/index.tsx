import ImgTrofel from '@/assets/TROFÉU.png'
import Logo from '@/assets/logoTwo.png'

export const Header = () => {
  return (
    <header className="w-full h-18 px-3 md:px-14 py-4 flex items-center justify-between bg-[#1f1e2b] rounded-2xl">
      <img className='w-8 md:w-13' src={ImgTrofel} alt="" />
      <p className='text-md md:text-3xl text-white font-semibold'>RANKING DE FUNCIONÁRIOS</p>
      <img className='w-7 md:w-10' src={Logo} alt="" />
    </header>
  )
}


