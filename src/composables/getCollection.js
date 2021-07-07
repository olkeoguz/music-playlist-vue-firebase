import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

const getCollection = (collection, query) => {
  const error = ref(null);
  const documents = ref(null);

  //Register the firestore collection reference
  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy('createdAt');

  if (query) {
    collectionRef = collectionRef.where(...query);
  }

  //RealTİme data
  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id }); //Wait for the firestore to return the 'createdAt' property to the front-end
      });

      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = 'Could not fetch data';
    }
  );

  //Unsubscribe when the ChatWindow unmounts( For unnecessary snapshots)
  watchEffect((onInvalidate) => {
    // Unsub from prev collection when watcher is stopped( When Component the watcher is used unmounted )
    onInvalidate(() => unsub());
  });

  return { documents, error };
};

export default getCollection;
