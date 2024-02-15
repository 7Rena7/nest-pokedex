import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { HttpAdapter } from 'src/common/interfaces/http-adapter.interface';

@Injectable()
export class PokeApiFetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching data from ${url} - check logs`);
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async put<T>(url: string, data: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async patch<T>(url: string, data: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async delete<T>(url: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

@Injectable()
export class PokeApiAxiosAdapter implements HttpAdapter {
  private readonly axios = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching data from ${url} - check logs`);
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async put<T>(url: string, data: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async patch<T>(url: string, data: any): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async delete<T>(url: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
