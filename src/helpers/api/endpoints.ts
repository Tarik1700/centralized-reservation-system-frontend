export const ENDPOINTS = {
  post_example: {
    uri: "/example",
    method: "POST",
  },
  get_example: {
    uri: "/example",
    method: "GET",
  },
};

export type ApiEndpoint = keyof typeof ENDPOINTS;
