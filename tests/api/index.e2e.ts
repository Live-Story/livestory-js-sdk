import LiveStoryClient from 'livestory-js-sdk';
import { beforeEach, describe, expect, test } from 'vitest';

describe('LivestoryClient', () => {
  let client: LiveStoryClient;

  beforeEach(() => {
    // Setup default mocks
    client = new LiveStoryClient({
      accessToken: process.env.VITE_OAUTH_TOKEN
    });
  });

  describe('layouts functions', () => {
    test("getLayouts({}) should return some layouts", async () => {
      const result = await client.getLayouts({})
      expect(result?.paging?.count).toBeGreaterThan(0)
    })
  
    test("getLayouts({ limit: 3 }) should return only 3 random layouts", async () => {
      const result = await client.getLayouts({ limit: 3 })
      expect(result?.items?.length).toBe(3)
    })
  
    test("getLayouts({ text: `server side rendering` }) should return only layouts that include text `server side rendering`", async () => {
      const result = await client.getLayouts({ text: 'server side rendering' })
      expect(result?.items?.length).toBe(1)
    })
  
    test("getLayouts({ folder_id: `6759588647c5aea40d4c1fd1` }) should return only layouts of folder 6759588647c5aea40d4c1fd1", async () => {
      const result = await client.getLayouts({ folder_id: '6759588647c5aea40d4c1fd1' })
      expect(result?.paging?.count).toBe(9)
    })
  
    test("getLayout should return the layout by wall id 636ecbe07b00680009e4a3af", async () => {
      const result = await client.getLayout({ id: '636ecbe07b00680009e4a3af', ssr: true })
      expect(result).toBeDefined()
    })
    
    test("getLayouts( filter_query: { $or: [{ myfield: '6759588647c5aea40d4c1fd1 }, { myfield: '6759589fbd7e4dd726db766d } ]}) should return layouts with the specific filter applied", async () => {
      const result = await client.getLayouts({
        filter_query: {
          '$or': [
            { myfield: { in: '6759588647c5aea40d4c1fd1' } },
            { myfield: { in: '6759589fbd7e4dd726db766d' } }
          ],
          myfield2: { in: 'example' }
        },
      })
      expect(result?.paging?.count).toBe(0)
    })
  });

  describe('destinations functions', () => {
    test("getPages({}) should return some pages", async () => {
      const result = await client.getPages({})
      expect(result?.paging?.count).toBeGreaterThan(0)
    })

    test("getPages({ folder_id: 663a3da042129e0008726b6c }) should return some pages", async () => {
      const result = await client.getPages({ folder_id: '663a3da042129e0008726b6c'})
      expect(result?.paging?.count).toBeGreaterThan(0)
    })
  });

  describe('workspaces functions', () => {
    test("getWorkspaces({}) should return some pages", async () => {
      const result = await client.getWorkspaces({})
      expect(result?.paging?.count).toBeGreaterThan(0)
    })
  });

  describe('posts functions', () => {
    test("getPosts({}) should return some posts", async () => {
      const result = await client.getPosts({})
      expect(result?.paging?.count).toBeGreaterThan(0)
    })

    test("getPostFolders({}) should return some post folders", async () => {
      const result = await client.getPostFolders({})
      expect(result?.paging?.count).toBeGreaterThan(0)
    })
  });

  describe('layout folders functions', () => {
    test("getLayoutFolders({}) should return some layout folders", async () => {
      const result = await client.getLayoutFolders({})
      expect(result?.paging?.count).toBeGreaterThan(0)
    })

    test("getLayoutFolders({ parent_folder: 675957bfae853636ff429e11 }) should return some folders", async () => {
      const result = await client.getLayoutFolders({ parent_folder: '675957bfae853636ff429e11' })
      expect(result?.paging?.count).toBeGreaterThan(0)
    })
  });

});
