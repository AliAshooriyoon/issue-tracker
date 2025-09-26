import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
export const DELETE = async (request: NextRequest) => {
  const body = await request.json();
  const deletedIssue = await prisma.issue.delete({
    where: {
      id: body.id,
    },
  });
  return NextResponse.json(deletedIssue);
};
