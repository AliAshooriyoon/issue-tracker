import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export const PATCH = async (request: NextRequest) => {
  const body = await request.json();
  const updatedData = await prisma.issue.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedData);
};
