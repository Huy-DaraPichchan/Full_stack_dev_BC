<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="create-post">write something: </label>
      <input type="text" id="create-post" v-model="task" placeholder="Create a post">
      <button v-on:click="createPost">Post</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    <div class="posts-container">
      <div class="post" 
      v-for="(post, index) in posts" 
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id" 
      v-on:dblclick="deletePost(post._id)"
      >
      {{`${post.dateCreated.getDate()}/${post.dateCreated.getMonth()}/
      ${post.dateCreated.getFullYear()}`}}
      <p class="task">{{post.task}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService';
export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      task: '',

    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    }catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.task);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin:0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ff5b5f;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.dateCreated {
  position: absolute;
  top: 0;
  left: 0;
  background-color: darkgreen;
  padding: 5px 15px 5px 15px;
  font-size: 13px;
}

div.task {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
