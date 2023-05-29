export const ENDPOINTS = {
  post_example: {
    uri: '/example',
    method: 'POST',
  },
  get_example: {
    uri: '/example',
    method: 'GET',
  },
  register_user: {
    uri: '/auth/register/customer',
    method: 'POST',
  },
  login_user: {
    uri: '/auth/authenticate',
    method: 'POST',
  },
  get_user_info: {
    uri: '/auth',
    method: 'GET',
  },
  get_restaurants: {
    uri: '/restaurants',
    method: 'GET',
  },
  get_restaurant: {
    uri: '/restaurants/{id}',
    method: 'GET',
  },
  create_restaurant: {
    uri: '/restaurants',
    method: 'POST',
  },
  set_rules: {
    uri: '/rules/{id}',
    method: 'POST',
  },
  get_owned_restaurants: {
    uri: '/restaurants/owner',
    method: 'GET',
  },
  post_reservation: {
    uri: '/reservations/post1',
    method: 'POST',
  },
  get_my_reservations: {
    uri: '/reservations/users/email/{id}',
    method: 'GET',
  },
  get_reservation_details: {
    uri: '/reservations/{id}',
    method: 'GET',
  },
  edit_restaurant: {
    uri: '/restaurants',
    method: 'PUT',
  },
  delete_restaurant: {
    uri: '/restaurants/owner',
    method: 'DELETE',
  },
  get_tables: {
    uri: '/tables/owner/{id}',
    method: 'GET',
  },
};

export type ApiEndpoint = keyof typeof ENDPOINTS;
