declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_CUCULUS_API_URL: string;
    readonly SITE_URL: string;
    readonly STAGE: string;
  }
}
