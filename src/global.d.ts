// Type declarations for non-TS imports
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
