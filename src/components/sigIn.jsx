import React from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
function SigIn() {
    return (
        <div className="flex w-full h-screen justify-center items-center">
        <SignIn />
      </div>
    )
}

export default SigIn
