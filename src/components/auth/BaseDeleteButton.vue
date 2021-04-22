<template>
  <!-- Modal Trigger -->
  <button v-if="userLoggedIn" class="waves-effect waves-light btn modal-trigger red" :data-target="modalID"><i class="material-icons">delete_forever</i> Ta bort</button>

  <teleport to="body">
  <div v-if="userLoggedIn" :id="modalID" class="modal">
    <div class="modal-content">
      <h4>Delete item with ID {{ id }} ?</h4>
    </div>
    <div class="modal-footer">
      <button class="waves-effect waves-light btn red" 
              @click="closeModalEmit"> Ta bort innehållet permanent! </button>
    </div>
  </div>
  </teleport>
</template>

<script>
import M from 'materialize-css';

export default {
    props: ['title', 'id'],
    mounted() {
      //  M.AutoInit();
    },
    emits: ['delete-item'],
    computed: {
        modalID() {
            return "modal-" + this.id
        },
        userLoggedIn() {
            return this.$store.state.user;
        }
    },
    methods: {
      closeModalEmit(){
      let instance = M.Modal.getInstance(document.getElementById(this.modalID));
      
      instance.close();
      this.$emit('delete-item', this.id);
      
      }
    }
}
</script>

<style lang="scss">

</style>