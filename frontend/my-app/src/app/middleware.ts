import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const isLoginPage = request.nextUrl.pathname === '/login'

    // Se não tem token e não está na página de login, redireciona para login
    if (!token && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Se tem token e está na página de login, redireciona para dashboard
    if (token && isLoginPage) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/login']
}