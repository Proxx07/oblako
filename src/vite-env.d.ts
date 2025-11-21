/// <reference types="vite/client" />
export interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_LOGIN: string
  readonly VITE_API_PASSWORD: string

  readonly VITE_API_LINK: string
  readonly VITE_API_USER: string
  readonly MODE: 'development' | 'production'
}


interface ImportMeta {
  readonly env: ImportMetaEnv
}
