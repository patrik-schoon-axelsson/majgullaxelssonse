<template>
<div class="carousel-item">
      <div class="card z-depth-2 darken-1 medium">
        <div class="card-content">
          <span class="card-title"><base-category-button :url="url" :category="category"></base-category-button></span>
          <span class="card-title"><strong class="center">{{ title}}</strong></span>
        </div>
        <div class="card-content">
            <p class="flow-text">{{ content }}</p>
        </div>
        <div class="card-action">
            <p class="flow-text">Inlägg av: {{author}} </p>
            <p class="flow-text">Först upplagt: {{ timeStampDate.toLocaleDateString() }}</p>
            <base-delete-button 
                  :id="id"
                  :title="title"
                  @delete-item="deletePressed"></base-delete-button>
        </div>
      </div>
</div>
</template>

<script>
import BaseDeleteButton from '../auth/BaseDeleteButton.vue';
import M from 'materialize-css';

export default {
  components: { BaseDeleteButton },    
    props: ['title', 'content', 'timeStamp', 'author', 'key', 'id', 'url', 'category'],
    emits: ['delete-item-by-id'],
    mounted() {
      M.AutoInit();
      
    },
    computed: {
      timeStampDate() {

        return this.timeStamp.toDate();
      }
    },
    methods: {
      deletePressed(id) {
        this.$emit('delete-item-by-id', id)
      }
    }
}
</script>

<style scoped>
.flow-text {
  font-size: 1rem;
}
</style>