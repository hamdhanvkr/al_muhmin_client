import React from 'react'

function Dashboard() {
    return (
        <div className='flex gap-10'>
            <div className='w-60 h-40 border-black border-2 rounded-2xl mt-5 flex'>
                <div className='h-full w-full flex flex-col justify-center items-center font-bold'>
                    <span>Total Members</span>
                    <span>15</span>
                </div>
            </div>
            <div className='w-60 h-40 border-black border-2 rounded-2xl mt-5 flex'>
                <div className='h-full w-full flex flex-col justify-center items-center font-bold'>
                    <span>Total Amount</span>
                    <span>$ 25000</span>
                </div>
            </div>
        </div>

    )
}

export default Dashboard