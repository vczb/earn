type Error = {
  status: number;
  name: string;
  message: string;
  details: unknown;
};

export type FechResponse = {
  error: Error;
  [key: string]: unknown;
};
