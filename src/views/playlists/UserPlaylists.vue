<template>
  <div class="user-playlists">
    <h2>My playlist</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
      <h3 v-if="playlists.length === 0">
        You don't have any playlists yet! Start creating one...
      </h3>
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a new playlist
    </router-link>
  </div>
</template>

<script>
import ListView from "@/components/ListView";
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents: playlists, error } = getCollection("playlists", [
      "userId",
      "==",
      user.value.uid,
    ]);

    // const userPlaylists = computed(() => {  //Second way
    //   if(user.value && playlists.value){
    //     return playlists.value.filter(playlist => playlist.userId === user.value.uid)
    //   }

    return { error, playlists };
  },
};
</script>

<style>
h3{
  margin:20px auto;
}
</style>