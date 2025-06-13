import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function TopBar({onOpen}) {

const navigate  = useNavigate();

const handleLogout =()=>{
	// alert("ARE YOU SURE WANT TO LOGOUT")
	navigate('/');
};

  return (
	<div className='py-2 px-4 flex items-center justify-between bg-gradient-to-r from-green-500 via-emerald-700 to-lime-600 shadow-lg backdrop-blur-sm rounded-b-md'>
			<button onClick={onOpen} className='p-2 rounded hover:bg-white/20 transition duration-200'>
				<FontAwesomeIcon icon={faBars} color='white' size='lg' />
			</button>
			<marquee className='text-white font-bold text-xl tracking-wide drop-shadow-sm'>
				AL MUHMIN ISLAMIC TRUST
			</marquee>
			<button className='p-2 rounded hover:bg-white/20 transition duration-200'>
				<FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} color='white' size='lg' />
			</button>
		</div>
  )
}

export default TopBar




















// import React from 'react'
// import { Menu, LogOut } from 'lucide-react'

// const TopBar = ({ onOpen }) => {
// 	return (
// 		<div className='py-2 px-4 flex items-center justify-between 
// 			bg-gradient-to-r from-green-500 via-emerald-600 to-lime-900 
// 			shadow-lg backdrop-blur-sm rounded-b-md'>
			
// 			<button
// 				onClick={onOpen}
// 				className='p-2 rounded hover:bg-white/20 transition duration-200'
// 			>
// 				<Menu color='white' size={24} />
// 			</button>

// 			<label className='text-white font-bold text-xl tracking-wide drop-shadow-sm'>
// 				Home
// 			</label>

// 			<button className='p-2 rounded hover:bg-white/20 transition duration-200'>
// 				<LogOut color='white' size={22} />
// 			</button>
// 		</div>
// 	)
// }

// export default TopBar
