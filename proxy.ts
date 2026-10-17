// export { auth as proxy } from "@/auth"

import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'
import Users from './models/user.model'
import MongoDB from './config/mongoDB.config'

MongoDB();
 
// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/register']
 
export default async function proxy(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
//   const cookie = (await cookies()).get('session')?.value
  const session = await auth()
 
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  if (session?.user && !session.user.category && path !== '/register') {
    return NextResponse.redirect(new URL('/register', req.nextUrl))
  }

  if (
    isPublicRoute &&
    session?.user &&
    session?.user.category &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
  if (isPublicRoute && session?.user && path === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}