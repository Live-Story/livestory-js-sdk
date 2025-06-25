/* eslint-disable no-undef */
import { expect, test, describe, beforeEach, it, vi } from 'vitest'
import LivestoryClient from '.'
import LsFetch, { ResponseFn } from './lsFetch';
import { LsHelpers } from './lsHelpers';

// Mocking external dependencies
vi.mock('../src/lsFetch', () => {
  const mockGet = vi.fn().mockResolvedValue({
    data: {
      links: 'Test data',
    },
    headers: {},
    status: 200
  });
  const mockPost = vi.fn();
  const mockSetFetchOptions = vi.fn();

  // Define a mock class with baseURL property
  class MockLsFetch {
    private baseURL: string;
    private timeout?: number;
    //private headers: Headers;
    private helpers: any;
    private responseInterceptor?: ResponseFn;
    constructor(config: any) {
      this.helpers = new LsHelpers();
      this.baseURL = config.baseURL || 'https://api.livestory.io/delivery/v1';
      this.responseInterceptor = config.responseInterceptor;
    }

    public get = mockGet;
    public post = mockPost;
    public setFetchOptions = mockSetFetchOptions;
  }

  return {
    default: MockLsFetch,
  };
});

describe('livestoryClient', () => {
  let client: any;

  beforeEach(() => {
    // Setup default mocks
    client = new LivestoryClient({
      accessToken: 'test-token'
    });
  });

  describe('initialization', () => {
    it('should initialize a client instance', () => {
      expect(client).toBeDefined();
      expect(client).toBeInstanceOf(LivestoryClient);
    });

    it('should set an accessToken', () => {
      expect(client.accessToken).toBe('test-token');
    });

    it('should set an endpoint', () => {
      expect(client.client.baseURL).toBe('https://api.livestory.io/delivery/v1');
    });

    it('should set a fetch instance', () => {
      expect(client.client).toBeInstanceOf(LsFetch);
    });

  });

  describe('get', () => {
    it('should fetch data from the API with mocked fetch', async () => {
      const result = await client.get('test');
      
      expect(result).toEqual({
        data: {
          links: 'Test data',
        },
        headers: {},
        status: 200
      });
    });
  });

});
