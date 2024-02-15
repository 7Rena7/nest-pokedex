import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
}

@Injectable()
export class PokeApiFetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const data: T = await response.json();
    return data;
  }
}

@Injectable()
export class PokeApiAxiosAdapter implements HttpAdapter {
  private readonly axios = axios;

  async get<T>(url: string): Promise<T> {
    const { data } = await this.axios.get<T>(url);
    return data;
  }
}
