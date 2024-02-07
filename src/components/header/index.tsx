import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='header bg-black relative'>

            <Link className='header_logo absolute top-0 bottom-0 left-0 right-0 m-auto flex items-center justify-center' href="../">
                <Image alt="World Ranks" width={320} height={320} src={"/Logo.svg"} />
            </Link>
           
            <Image className='header_background m-auto' alt="World Ranks" width={1280} height={300} src={"/hero-image-wr.jpg"} />

        </div>
    )
}

export default Header