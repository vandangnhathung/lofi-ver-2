declare global {
  interface Window {
    EasyPopup: {
      init: (selector: string, options?: Record<string, unknown>) => void;
      get: (id: string) => {
        open: () => void;
        close: () => void;
        toggle: () => void;
        on: (event: string, callback: (data: unknown) => void) => void;
      };
      setDev: (isDev: boolean) => void;
    };
  }
}

export {}; 