<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- Playlist information-->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownerShip" @click="deletePlaylist">Delete Playlist</button>
    </div>

    <!-- Song List -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet
      </div>

      <div class="single-song" v-for="song in playlist.songs" :key="song.id">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>

        <button v-if="ownerShip" @click="deleteSong(song.id)">Delete</button>
      </div>
      <AddSong v-if="ownerShip" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import AddSong from "@/components/AddSong";
import getDocument from "@/composables/getDocument";
import { computed, ref } from "vue";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import { useRouter } from "vue-router";
import useStorage from "@/composables/useStorage";

export default {
  props: ["id"],
  components: { AddSong },
  setup(props) {
    const { document: playlist, error } = getDocument("playlists", props.id);
    const { user } = getUser();
    const { isPending, deleteDoc, updateDoc } = useDocument(
      "playlists",
      props.id
    );
    const { deleteImage } = useStorage();

    const router = useRouter();

    //Decide if the logged in user is the creator of the playlist to allow deleting
    const ownerShip = computed(() => {
      return (
        playlist.value && user.value && user.value.uid === playlist.value.userId
      );
    });

    const deletePlaylist = async () => {
      await deleteImage(playlist.value.filePath);
      await deleteDoc();
      router.push("/");
    };

    const deleteSong = async (id) => {
      await updateDoc({
        songs: playlist.value.songs.filter((song) => song.id !== id),
      });
    };

    return {
      playlist,
      error,
      ownerShip,
      deletePlaylist,
      isPending,
      deleteSong,
    };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}

.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}

.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}

.playlist-info {
  text-align: center;
}

.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}

.playlist-info p {
  margin-bottom: 20px;
}

.username {
  color: #999;
}

.description {
  text-align: center;
}

.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>