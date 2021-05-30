<template>
<div>
  <!-- Medium and above screens card -->
   <div class="card horizontal hide-on-small-only">
      <div class="card-image">
        <img :src="img">
      </div>
    <div class="card-stacked">
    <div class="card-content">
      <span class="card-title grey-text text-darken-4">{{ title }}</span>
        <p class="flow-text"><strong>ISBN-nummer:</strong> {{isbn}}</p>
        <p class="flow-text"><strong>Förläggare:</strong> {{ publisher}}</p>      
      <blockquote class="flow-text">
        {{ quote }}
      </blockquote>
      <p class="flow-text">
        {{ content }}
      </p>
        <div class="card-action">
          <base-delete-button
                  :id="id"
                  :title="title"
                  @delete-item="deletePressed"></base-delete-button>
        </div>             
      </div> 
    </div>
   </div>
  <!-- Small screen card. -->
    <div class="card hide-on-med-and-up">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" :src="img">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">{{title}}<i class="material-icons right">more_vert</i></span>
      <blockquote class="flow-text">
        {{ quote }}
      </blockquote>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{{title}} <i class="material-icons right">close</i></span>
      <p class="flow-text">
        {{ content }}
      </p>
    </div>
    <div class="card-action">
      <base-delete-button
            :id="id"
            :title="title"
            @delete-item="deletePressed"></base-delete-button>
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

<style scoped>
.card-image {
  border-radius: 25px;
}
</style>