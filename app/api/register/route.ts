import prisma from '@/prisma/client';
import { hash } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();
  const existing = await prisma.user.findUnique({
    where: { email },
  });
  if (existing) {
    return NextResponse.json({ error: 'User alredy exists!' }, { status: 400 });
  }
  const hashedPassword = await hash(password, 10);
  await prisma.user.create({ data: { name, email, password: hashedPassword } });

  return NextResponse.json({ message: 'User registered!' });
};
