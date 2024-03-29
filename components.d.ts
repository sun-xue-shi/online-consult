export {}

declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: (typeof import('vue-router'))['RouterLink']
    RouterView: (typeof import('vue-router'))['RouterView']
    VanButton: (typeof import('vant/es'))['Button']
  }
}
