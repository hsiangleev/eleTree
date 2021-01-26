declare module "*.html" {
  const content: string;
  export default content;
}


interface MapLike<T> {
  [index: string]: T;
}
