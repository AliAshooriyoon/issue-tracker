import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';

export const PATCH = async () => {
  const issues = await prisma.issue.findMany();
  for (const item of issues) {
    const cleanItem = item.title.replace(/[^\w\s]/g, '');

    const slug = `${cleanItem.trim().split(' ').join('').toLowerCase()}-${item.id}`;
    await prisma.issue.update({
      where: { id: item.id },
      data: {
        slug,
      },
    });
  }
  return NextResponse.json({ success: true, updated: issues.length });
};
