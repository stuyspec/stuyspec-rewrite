import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {

  const { origin, pathname } = request.nextUrl
  if (pathname === '/') {
    console.log(`middleware(${origin} ${pathname}) matched`) 
    const data = await (await fetch(origin+"/api/rate-limit")).json()
    console.log( JSON.stringify(data), data['remaining'] )
    if (data['remaining'] == -1 ) {
      return NextResponse.rewrite(new URL('api/429', request.url))
    }
  }
  return NextResponse.next()
 
}
