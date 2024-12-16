/// <reference types="vite/client" />

declare module 'tom-select/dist/js/tom-select.complete.min.js' {}
declare module 'apexcharts/src/apexcharts.js';

declare module 'youtube' {
  import 'youtube';

  export type Player = YT.Player;
  export type PlayerOptions = YT.PlayerOptions;
  export type PlayerEvent = YT.PlayerEvent;
}
