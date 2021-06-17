import { createStore } from 'vuex'
import firebase from 'firebase/app';

const db = firebase.firestore();

export default createStore({
  state: {
      isAuthed: false,
      user: null,
      books: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBooks(state, book) {
      state.books.push(book)
    },
    clearBooks(state) {
      state.books = [];
    }
  },
  actions: {
    setBookOnLoad(context) {
      context.commit('clearBooks');
      const books = db.collection("books");
  
      books.orderBy('yearOfRelease', 'desc').get()
      .then((dbBooks) => {
        
        dbBooks.forEach((book) => {
        
          const bookItem = {
            id: book.id,
            title: book.data().title,
            content: book.data().content,
            isbn: book.data().isbn,
            quote: book.data().quote,
            publisher: book.data().publisher,
            coverURL: book.data().coverURL,
            yearOfRelease: parseInt(book.data().yearOfRelease)
          }

          context.commit('setBooks', bookItem)
        });
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  getters: {
    isLoggedIn(state) {
      return firebase.auth().currentUser
    },
    getBooks(state) {
      return state.books;
    },
    getBookByID(state, id) {
      return state.books.find(
                book => book.id == id)
    }
  },
  modules: {
    
  }
})
