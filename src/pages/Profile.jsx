import React from 'react'

import PersonalDetails from '../components/core/Profile/PersonalDetails'
import Svg from "../../src/components/common/Svg";
const { SvgLogo } = Svg;


const Profile = () => {
  return (
    <div className='w-full bg-[#131619] text-white'>
        <div>
            <div>
                <div>
                    <SvgLogo />
                    <div>
                        <p>Welcome  </p>
                        <p>lets us know more about </p>
                    </div>
                    <div>
                        <PersonalDetails />
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>


    </div>
  )
}

export default Profile
