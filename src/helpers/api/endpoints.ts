export const ENDPOINTS = {
  post_example: {
    uri: "/example",
    method: "POST",
  },
  get_example: {
    uri: "/example",
    method: "GET",
  },
  register_user: {
    uri: "/auth/register/customer",
    method: "POST",
  },
  login_user: {
    uri: "/auth/authenticate",
    method: "POST",
  },
  get_user_info: {
    uri: "/auth",
    method: "GET",
  },
  create_restaurant: {
    uri: "/restaurants/create",
    method: "POST",
  },
};

export type ApiEndpoint = keyof typeof ENDPOINTS;
