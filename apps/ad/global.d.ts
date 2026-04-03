// global.d.ts
export {};

declare global {
  type Window = {
    gtag?: (
      command: 'event' | 'config' | 'js',
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  };
}