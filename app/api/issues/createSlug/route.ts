import prisma from '@/prisma/client';

export const PATCH = async () => {
  const issues = await prisma.issue.findMany();
  for (const item of issues) {
    const slug = `${item.title.trim().split(' ').join('').toLowerCase()}${item.id}`;
    await prisma.issue.update({
      where: { id: item.id },
      data: {
        slug,
      },
    });
  }
};
