<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>

    <a href="https://vuejs.org/" target="_blank">
      <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <HelloWorld msg="Vite + Vue" />
</template>

<script setup>
import { createPost, fetchPosts, fetchPostByID, updatePost, removePost } from '@/api/posts.js';

import HelloWorld from '@/components/HelloWorld.vue';

console.log('Backend', import.meta.env.VITE_BACKEND);

const newPost = await createPost({
  author: 'magner',
  title: 'Post title',
  content: 'Any post content',
});

console.log('Added post', newPost);

const posts = await fetchPosts();

console.log('Posts list', posts);

const postID = newPost?.id || null;

if (postID) {
  const post = await fetchPostByID(postID);

  console.log('Post by ID', post);

  const updatedPost = await updatePost({
    id: postID,
    author: 'Aleksey Magner',
  });

  console.log('Updated post', updatedPost);

  await removePost(postID);
}
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
