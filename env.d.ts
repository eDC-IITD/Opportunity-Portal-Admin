declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // [key: string]: string | undefined;
      PORT: string;
      ADMIN_PASSWORD: string;
      DATABASE_URL: string;
    }
  }
}
