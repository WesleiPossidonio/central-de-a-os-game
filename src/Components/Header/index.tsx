import ImgTrofel from '@/assets/TROFÉU.png'
import Logo from '@/assets/LogoOne.png'

export const Header = () => {
  return (
    <header className="w-full h-18 px-14 py-4 flex items-center justify-between bg-[#1f1e2b] rounded-2xl">
      <img className='w-13' src={ImgTrofel} alt="" />
      <p className='text-3xl text-white font-semibold'>HANKING DE FUNCIONÁRIOS</p>
      <img className='w-10' src={Logo} alt="" />
    </header>
  )
}


