declare global {
  interface Window {
    plausible: (value: string) => void;
  }
}
