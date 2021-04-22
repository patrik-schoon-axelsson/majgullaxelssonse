<template>
<div>
   <div class="card z-depth-2">
      <div class="card-image">
      <img class="activator responsive-img" :src="img">
      </div>
    <div class="card-content">
      <span class="card-title activator">{{ title }} <i class="material-icons right">more_vert</i></span>
    </div>
    <div class="card-content">      
      <blockquote>
        {{ quote }}
      </blockquote>
      <base-delete-button
                  :id="id"
                  :title="title"
                  @delete-item="deletePressed"></base-delete-button>
                  
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{{ title }}<i class="material-icons right">close</i></span>
      <p class="flow-text">
        {{ content }}
      </p>
      <p class="flow-text"><strong>ISBN-nummer:</strong> {{isbn}}</p>
      <p class="flow-text"><strong>Förläggare:</strong> {{ publisher}}</p>
    </div>
  </div>
</div>
</template>

<script>
import M from 'materialize-css';
import BaseDeleteButton from '../../auth/BaseDeleteButton.vue';
M.AutoInit();


export default {
  components: { BaseDeleteButton },
    props: [ 'title', 'content', 'quote', 'img', 'id', 'isbn', 'publisher'],
    methods: {
      deletePressed(id) {
        this.$emit('delete-item-by-id', id)
      }
    }
}
</script>

<style lang='scss' scoped>
.card {
  max-width: 450px;
  height: 100%;
  img {
    max-width: 450px;
    height: 100%;
  }
}

</style>