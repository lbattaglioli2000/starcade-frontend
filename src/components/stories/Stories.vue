<template>
  <h1 class="sr-only">Recent questions</h1>
  <ul role="list" class="space-y-4">
    <li v-for="story in allStories" :key="story.id" class="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
      <story :story="story" :key="story.id" />
    </li>
  </ul>
</template>

<script>
import Story from "./Story.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  components: { Story },
  name: "Stories",
  created() {
    this.fetchStories();
  },
  computed: mapGetters(["allStories"]),
  methods: {
    ...mapActions(["fetchStories"]),
  },
};
</script>