<template>
  <li class="tab col"><router-link :to="{ name: 'bookview_details',
    params: {
      id: this.id,
    }}"> {{ title }} ({{ yearOfRelease }})</router-link></li>
</template>

<script>
import M from 'materialize-css';

export default {
    data() {
        return {
      
        }
    },
    props: ['id', 'title', 'yearOfRelease'],
    mounted(){
        M.AutoInit();
    },
    computed: {
        tabKey(){
            return `keyli-${this.id}`;
        },
    }
}
</script>

<style>

</style>