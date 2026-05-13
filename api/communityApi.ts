/**
 * @file communityApi.ts
 * @description API functions for community-related data (posts and users).
 * All requests are made through the shared `communityApi` Axios instance defined in `index.ts`.
 */

import { communityApi } from ".";

/**
 * Fetches all community posts.
 * @returns A promise resolving to an array of post objects.
 */
export function fetchPosts() {
    return communityApi.get('/posts');
}

/**
 * Fetches a single post by its ID.
 * @param id - The unique identifier of the post.
 * @returns A promise resolving to the matching post object.
 */
export function fetchPostById(id: string) {
    return communityApi.get(`/posts/${id}`);
}

/**
 * Fetches a single user by their ID.
 * @param id - The unique identifier of the user.
 * @returns A promise resolving to the matching user object.
 */
export function fetchUserById(id: string) {
    return communityApi.get(`/users/${id}`);
}

/**
 * Creates a new community post.
 * @param data - The post payload containing the author's user ID, title, and body text.
 * @returns A promise resolving to the newly created post object.
 */
export function createPost(data: { userId: string; title: string; body: string }) {
    return communityApi.post('/posts', data);
}

/**
 * Deletes a community post by its ID.
 * @param id - The unique identifier of the post to delete.
 * @returns A promise resolving to the deletion confirmation response.
 */
export function deletePost(id: string) {
    return communityApi.delete(`/posts/${id}`);
}
