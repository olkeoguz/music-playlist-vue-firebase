import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const user = ref(projectAuth.currentUser); //null initially

projectAuth.onAuthStateChanged((_user) => {
  // console.log('User state changed.Current user is: ', _user); //automatically sets the _user when authState Changes
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
