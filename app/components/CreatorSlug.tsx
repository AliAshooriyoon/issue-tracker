'use client';
import { useEffect } from 'react';
const CreatorSlug = () => {
  useEffect(() => {
    const changeSlug = async () => {
      await fetch('http://localhost:3000/api/createSlug', { method: 'PATCH' });
    };
    changeSlug();
  }, []);
  return null;
};
export default CreatorSlug;
