<template>
  <div v-if="isLoading">
    <div class="container">
      <h3 class="center-align"> Laddar äldre nyheter... </h3>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </div>
  </div>
  <div v-else>
      <div class="view__wrapper z-depth-2">
                  <table>
                    <thead>
                      <th>Titel</th>
                      <th>Extern länk</th>
                      <th>Tidpunkt</th>
                    </thead>
                    <tr v-for="doc in archivedNews" :key="doc.id">
                      <td><archive-modal :id=doc.id :title="doc.title" :content="doc.content"></archive-modal></td>
                      <td><a :href="doc.url" target="_blank">Länk</a></td>
                      <td>{{ doc.time.toLocaleDateString() }}</td>
                    </tr>
                  </table>
        
      </div>    
  </div>
</template>

<script>
import firebase from "firebase/app";
import ArchiveModal from "../components/ui/ArchiveModal.vue";


const db = firebase.firestore();

const archive = db.collection('news');

export default {
    
    data() {
        return {
            isLoading: false,
            archivedNews: []
          }
    },
    components: { ArchiveModal },
    mounted() {
      this.isLoading = true;

      archive.get()
        .then((data) => {
          data.docs.forEach(doc => {

            let newsItem = {
              id: doc.id,
              title: doc.data().title,
              url: doc.data().url,
              time: doc.data().timeAdded.toDate(),
              content: doc.data().content,
              author: doc.data().author,
              category: doc.data().category
            }

            this.archivedNews.push(newsItem);
          })
        })
        .finally(() => {
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err)
          
        });
    }
}
</script>

<style>

</style>