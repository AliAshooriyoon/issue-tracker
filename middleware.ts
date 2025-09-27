// middleware.ts
export { auth as middleware } from './auth';

export const config = {
  matcher: ['/issues/:path*'], // <-- hier :path* wichtig, sonst funktioniert nur genau /issues
};
