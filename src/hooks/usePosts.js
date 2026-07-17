import { storage, generateId } from '../utils/storage';

/**
 * Collection of CRUD helpers for posts, likes and comments.
 * Kept as a plain hook (no internal state) - callers own their own state
 * and re-read from storage after every mutation so the UI stays in sync.
 */
export function usePosts() {
  // ---- Posts ----
  function getAllPosts() {
    return storage.getPosts();
  }

  function getPublicFeedPosts() {
    return storage
      .getPosts()
      .filter((p) => p.isPublic && !p.isDraft)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function getPostsByUser(userId) {
    return storage
      .getPosts()
      .filter((p) => p.authorId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function getPublicPostsByUser(userId) {
    return getPostsByUser(userId).filter((p) => p.isPublic && !p.isDraft);
  }

  function getPostById(postId) {
    return storage.getPosts().find((p) => p.id === postId) || null;
  }

  function createPost({ authorId, description, image, isPublic, isDraft }) {
    const posts = storage.getPosts();
    const now = new Date().toISOString();
    const newPost = {
      id: generateId('post'),
      authorId,
      description,
      image: image || null,
      isPublic: !!isPublic,
      isDraft: !!isDraft,
      createdAt: now,
      updatedAt: now,
    };
    storage.setPosts([newPost, ...posts]);
    return newPost;
  }

  function updatePost(postId, updates) {
    const posts = storage.getPosts();
    const updatedPosts = posts.map((p) =>
      p.id === postId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    storage.setPosts(updatedPosts);
    return updatedPosts.find((p) => p.id === postId);
  }

  function deletePost(postId) {
    storage.setPosts(storage.getPosts().filter((p) => p.id !== postId));
    // Clean up related comments and likes so we don't leave orphan data.
    storage.setComments(storage.getComments().filter((c) => c.postId !== postId));
    storage.setLikes(storage.getLikes().filter((l) => l.postId !== postId));
  }

  function togglePostVisibility(postId) {
    const post = getPostById(postId);
    if (!post) return null;
    return updatePost(postId, { isPublic: !post.isPublic });
  }

  function publishPost(postId) {
    return updatePost(postId, { isDraft: false, isPublic: true });
  }

  // ---- Likes ----
  function getLikesForPost(postId) {
    return storage.getLikes().filter((l) => l.postId === postId);
  }

  function hasUserLiked(postId, userId) {
    if (!userId) return false;
    return storage.getLikes().some((l) => l.postId === postId && l.userId === userId);
  }

  function toggleLike(postId, userId) {
    const likes = storage.getLikes();
    const existing = likes.find((l) => l.postId === postId && l.userId === userId);

    if (existing) {
      storage.setLikes(likes.filter((l) => l.id !== existing.id));
      return false; // now unliked
    }

    const newLike = {
      id: generateId('like'),
      postId,
      userId,
      createdAt: new Date().toISOString(),
    };
    storage.setLikes([...likes, newLike]);
    return true; // now liked
  }

  // ---- Comments ----
  function getCommentsForPost(postId) {
    return storage
      .getComments()
      .filter((c) => c.postId === postId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  function addComment(postId, authorId, text) {
    const comments = storage.getComments();
    const newComment = {
      id: generateId('cmt'),
      postId,
      authorId,
      text,
      createdAt: new Date().toISOString(),
    };
    storage.setComments([...comments, newComment]);
    return newComment;
  }

  function deleteComment(commentId) {
    storage.setComments(storage.getComments().filter((c) => c.id !== commentId));
  }

  return {
    getAllPosts,
    getPublicFeedPosts,
    getPostsByUser,
    getPublicPostsByUser,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    togglePostVisibility,
    publishPost,
    getLikesForPost,
    hasUserLiked,
    toggleLike,
    getCommentsForPost,
    addComment,
    deleteComment,
  };
}
