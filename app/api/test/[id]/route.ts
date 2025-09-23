import { NextResponse, NextRequest } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const id = params?.id;
  console.log(params);
  const body = [
    { user: `${id}`, id: 1 },
    { user: 'Ahura', id: 2 },
  ];
  return NextResponse.json(body);
};
