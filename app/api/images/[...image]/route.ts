import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
  const res = await fetch(`https://hub.docker.com/v2/repositories/${params.image[0]}/${params.image[1]}/tags/`);
  const data = await res.json();

  let response: NextResponse = NextResponse.json(data);
  response.headers.set('Content-Type', 'application/json');

  return response;
}