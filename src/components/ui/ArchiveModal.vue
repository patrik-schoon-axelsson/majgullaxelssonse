<template>
    <!-- Modal Trigger -->
  <button class="waves-effect waves-light btn modal-trigger" :data-target="modalID">{{title}}</button>

  <!-- Modal Structure -->
  <teleport to="body">
  <div :id="modalID" class="modal">
    <div class="modal-content">
      <h4> {{title}} </h4>
      <p> {{content}}</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  </teleport>
</template>

<script>
import M from 'materialize-css';

export default {
    props: ['title', 'content', 'author', 'timestamp', 'id'],
    mounted(){
/*         document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        
        M.Modal.init(elems, options);
      }); */
    },
    computed: {
      modalID() {
        return "modalArchive-" + this.id
      }
    }
}
</script>

<style>

</style>