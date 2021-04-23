export declare global {
  interface Window {
    ipc: {
      send: (any, any) => void;
      on: (any, any) => void;
    };
  }
}
