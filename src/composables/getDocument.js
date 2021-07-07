import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

const getDocument = (collection, id) => {
  const error = ref(null);
  const document = ref(null);

  let documentRef = projectFirestore.collection(collection).doc(id);

  //RealTİme data
  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id }; 
        error.value = null;
      } else {
        error.value = 'That document does not exist !';
      }
    },
    (err) => {
      console.log(err.message);
      document.value = null; //
      error.value = 'Could not fetch data';
    }
  );

  //Unsubscribe when the ChatWindow unmounts( For unnecessary snapshots)
  watchEffect((onInvalidate) => {
    // Unsub from prev collection when watcher is stopped( When Component the watcher is used unmounted )
    onInvalidate(() => unsub());
  });

  return { document, error };
};

export default getDocument;
