import Axios, { AxiosInstance, Method } from 'axios';
import { get, cloneDeep } from 'lodash';
import * as qs from 'qs';
import { ApiEndpoint, ENDPOINTS } from './endpoints';
import TOKEN from './token';

const appConfig = { apiUrl: 'http://localhost:8080' };

class ApiFactory {
  headers: any;

  client: AxiosInstance;

  endpoints: typeof ENDPOINTS;

  constructor(endpoints: typeof ENDPOINTS) {
    this.headers = {};
    this.endpoints = endpoints;
    this.client = Axios.create();
  }

  fetch = async <
    T extends { request: object; response: unknown; requestBody: unknown }
  >(
    endpoint: ApiEndpoint,
    rawData?: T['request']
  ): Promise<T['response']> => {
    const data = cloneDeep(rawData);
    const response = this.generateFullUri(this.endpoints[endpoint].uri, data);
    let { url } = response;
    const { removed } = response;
    const method = this.endpoints[endpoint].method as Method;
    if (data) {
      (removed as unknown as (keyof T['request'])[]).forEach((key) => {
        if (key in data) delete data[key];
      });
    }

    const body = data as unknown as T['requestBody'];
    const token = TOKEN.get();

    if (token) {
      this.headers = { Authorization: `Bearer ${token}` };
    }

    if (method === 'GET') {
      const queryString = qs.stringify(body, { arrayFormat: 'repeat' });
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    try {
      const res = await this.client({
        url,
        method,
        data: body,
        headers: this.headers,
      });

      return res.data;
    } catch (e) {
      console.log(`@@API_ERROR at ${endpoint}`, e);
      throw e;
    }
  };

  private generateFullUri = (endpoint: string, data: unknown) => {
    const removed: string[] = [];

    const url = `${appConfig.apiUrl}${endpoint}`.replace(
      /{(.*?)}/g,
      (token, name: string) => {
        let value = token;
        if (typeof data === 'object' && data && name in data) {
          removed.push(name);
          // console.log(endpoint, data, name, get(data, name));
          // value = get(data, name).toString();
          value = get(data, name) as string;
        }
        return value as string;
      }
    );

    return { url, removed };
  };

  /* Tests */
  public reinitializeEndpoints = (endpoints: typeof ENDPOINTS) => {
    this.endpoints = endpoints;
  };
}

const api = new ApiFactory(ENDPOINTS);

export default api;
