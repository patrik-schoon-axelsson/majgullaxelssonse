<template>
  <nav>
    <div class="nav-wrapper">
       <a href="#" class="brand-logo left hide-on-med-and-down">Majgull Axelsson.SE</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><router-link  class="tooltipped" data-position="bottom" data-tooltip="Hem" to="/"><i class="material-icons">home</i></router-link></li>
            <li class="tooltipped" data-position="bottom" data-tooltip="Om Majgull"><router-link to="/about"><i class="material-icons">speaker_notes</i></router-link></li>
            <li class="tooltipped" data-position="bottom" data-tooltip="Böcker"><router-link to="/books"><i class="material-icons">book</i></router-link></li>
            <li class="tooltipped" data-position="bottom" data-tooltip="Administration" v-if="userLoggedIn">
            <router-link  to="/dashboard"><i class="material-icons">group_add</i></router-link></li>
            <li class="tooltipped" data-position="bottom" data-tooltip="Konto"><router-link to="/auth">
            <i v-if="userLoggedIn" class="material-icons">lock_open</i><i v-else class="material-icons">lock_outline</i></router-link></li>
        </ul>
    </div>
  </nav>
  <ul class="sidenav" id="mobile-demo">
       <li>
        <div class="center-align">
        <h5 class="brand-logo"><strong>Majgull Axelsson.se</strong></h5>
        <h6 v-if="userLoggedIn">Inloggad: {{userLoggedIn.email}}</h6>
       </div>
       </li>
       <a href="#" class="brand-logo center hide-on-med-and-down">Majgull Axelsson.se</a>
       <li><router-link to="/"><i class="material-icons">home</i> Hem</router-link></li>
       <li><router-link to="/about"><i class="material-icons">speaker_notes</i> Om Majgull</router-link></li>
       <li><router-link to="/books"><i class="material-icons">book</i> Böcker</router-link></li>
       <li v-if="userLoggedIn"><router-link to="/auth"><i class="material-icons">lock_open</i> Konto</router-link></li>
       <li v-else><router-link to="/auth"><i class="material-icons">lock_outline</i> Konto</router-link></li>
       <li><router-link v-if="userLoggedIn" to="/dashboard"><i class="material-icons">group_add</i> Administration</router-link></li>
  </ul>
</template>

<script>
import M from 'materialize-css';

export default {
    mounted() {
        // Materialize mobile navbar initialization

          document.addEventListener('DOMContentLoaded', function() {
          var elems = document.querySelectorAll('.sidenav');
          var instances = M.Sidenav.init(elems);
        // Materialize tooltip plugins
          document.addEventListener('DOMContentLoaded', function() {
          var elems = document.querySelectorAll('.tooltipped');
          var instances = M.Tooltip.init(elems, options);
  });
  });
    },
    computed: {
        userLoggedIn() {
            return this.$store.state.user;
        }
    },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

li {
  padding: auto;
  a{
    font-size: 2rem;
   }
}
.brand-logo {
  font-size: 2.5rem;
  font-family: 'Dancing Script', cursive;
  margin: .5rem;
}
</style>