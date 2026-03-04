import { Poppins } from 'next/font/google';
 
export const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['200', '300', '400'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})