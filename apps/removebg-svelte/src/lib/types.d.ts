export const ImageStatus = {
  READY: Symbol("Ready"),
  UPLOADING: Symbol("Uploading"),
  ERROR: Symbol("Error"),
  DONE: Symbol("Done"),
} as const;
