/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

// Fallback declarations for imagetools query strings so TS accepts them.
declare module '*?format=webp&quality=82' {
  const src: string;
  export default src;
}
declare module '*?format=webp&quality=82&as=srcset' {
  const srcset: string;
  export default srcset;
}
