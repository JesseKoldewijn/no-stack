declare module '*.tsrx' {
  // Octane compiles `.tsrx` into runtime components; we treat them as `any` for MVP typechecking.
  // This unblocks `tsc` so it can resolve imports used by the Nest controller and client bootstrap.
  export const Layout: any;
  export const ProductPage: any;
  export const HomePage: any;
  export const ProductDetails: any;
}

