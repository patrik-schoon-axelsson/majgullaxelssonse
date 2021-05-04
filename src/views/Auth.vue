<template> 
<div class="container z-depth-2">
    <div class="row">
    <form v-if="!user" @submit.prevent="loginUser">
        <div class="center">
            <h4>Logga in med ditt administrator-konto.</h4>
            <p>Om du behöver återställa ditt lösenord, vänligen kontakta sidans administratör via <strong>webmaster@majgullaxelsson.se</strong></p>
        </div>
        <div class="row">
            <div class="col s12 m6 input-field">
                <i class="material-icons prefix">email</i>
                <input class="validate" placeholder="Email" v-model="email" type="email" name="email" id="email">
            </div>
            <div class="col s12 m6 input-field">
                <i class="material-icons prefix">lock</i>
                <input class="validate" placeholder="Lösenord" v-model="password" type="password" name="password" id="password">
            </div>
        </div>
        <button class="btn" type="submit">Logga in </button>
    </form>    
    <form v-else @submit.prevent="logoutUser">
        <div class="col 12">
        <p>
        {{ user.email }}
        </p>
        <button class="btn" type="submit"><i class="material-icons">lock_open</i> Logga ut</button>
        </div>
  </form>
  </div>
</div>
</template>

<script>
import firebase from 'firebase/app';
import M from 'materialize-css';

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        loginUser(){
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
                this.$store.state.user = user;
                M.toast({html: 'Du är nu inloggad!'});
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                M.toast({html: `<strong>Felkod ${errorCode}</strong>: ${errorMessage}`});
            });
        })
        .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                M.toast({html: `<strong>Felkod ${errorCode}</strong>: ${errorMessage}`});
            });
        },
        logoutUser(){
            firebase.auth().signOut().then(() => {
                // Clearing state upon succesful logout
                this.$store.state.user = null;
                M.toast({html: 'Du har nu loggat ut!'});
            }).catch((error) => {
                M.toast({html: `${error}`});
            });
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    }
}
</script>

<style scoped>

.z-depth-2 {
  background-color: #fff;
  position: 50%;
  margin-top: 1.6rem;
  margin-bottom: 16rem;
}

</style>