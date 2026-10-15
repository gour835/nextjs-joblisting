'use client'
import { googleLogin } from "@/app/action/auth"
 
export default function SignIn() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
              <a
                className="group relative w-full flex items-center justify-center gap-2 bg-[#1c1c24] text-white rounded-lg p-3 hover:bg-[#25252e] transition-all"
                onClick={(e)=>{
                  e.preventDefault()
                  googleLogin()
                }}
              >
                {/* 1. MANUALLY POSITIONED GLOW ZONES (Behind the button) */}
                <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-105">
                  {/* RIGHT: Google Blue Glow */}
                  <div className="absolute -right-1 top-1/4 bottom-1/4 w-2 bg-[#4285F4] blur-xl opacity-80" />
                  {/* TOP: Aggressive Google Red Glow */}
                  <div className="absolute -top-1 left-1/4 right-1/4 h-2 bg-[#EA4335] blur-xl opacity-100" />
                  <div className="absolute -top-0.5 left-1/3 right-1/3 h-1 bg-[#EA4335] blur-md opacity-100" />


                  {/* BOTTOM: Google Green Glow */}
                  <div className="absolute -bottom-1 left-1/4 right-1/4 h-2 bg-[#34A853] blur-xl opacity-80" />

                  {/* LEFT: Google Yellow Glow */}
                  <div className="absolute -left-1 top-1/4 bottom-1/4 w-2 bg-[#FBBC05] blur-xl opacity-80" />
                </div>

                {/* 2. Pure Inline CSS Border Layer (Fixes the linter error completely) */}
                <div
                  className="absolute inset-0 rounded-lg p-px opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />

                {/* SVG and Text Content */}
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>

                <span className=" text-gray-400 group-hover:text-white transition-colors">Google</span>
                {/* <form
                  action={async () => {
                    "use server"
                    await signIn("google")
                  }}
                >
                  <button type="submit">Google</button>
                </form> */}
                 
              </a> 

            </div>
    </>
  )
} 