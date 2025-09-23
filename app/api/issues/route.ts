import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/client';
const schemaIssues = z.object({
  title: z.string().min(2).max(300),
  description: z.string().min(1),
});
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = schemaIssues.safeParse(body);
  if (!validation.success) return NextResponse.json(validation.error.message, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
};
