<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
      <form>
        <v-flex xs5 offset-xs3>
          <v-text-field v-model="movieName" :error-messages="movieNameErrors"
            label="Movie Name" required @input="$v.name.$touch()"></v-text-field>
        </v-flex>
        <v-flex xs5 offset-xs3>
          <v-text-field v-model="description" :error-messages="descErrors"
            label="Description" required @input="$v.name.$touch()" multi-line=""></v-text-field>
        </v-flex>
        <v-flex xs5 offset-xs3>
          <v-text-field v-model="director" :error-messages="directoreErrors"
            label="Director" required @input="$v.name.$touch()"></v-text-field>
        </v-flex>
        <v-flex xs5 offset-xs3>
          <v-text-field v-model="writer" :error-messages="writerErrors"
            label="Writer" required @input="$v.name.$touch()"></v-text-field>
        </v-flex>
        <v-flex xs5 offset-xs3>
          <v-btn raised dark class="red lighten-1" @click="onPickFile">Upload Image</v-btn>
            <input type="file" 
              style="display:none" 
              ref="fileInput" 
              accept="image/*"
              @change="onFilePicked"
              />
        </v-flex>
        <v-flex xs5 offset-xs3>
          <img :src="imageUrl" height="150px"/>
          
          <rate></rate>
        </v-flex>
      </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Rate from '../common/Rate'
export default {
  name: 'NewMovie',
  components: {
    'rate':Rate
  },
  data () {
    return {
      movieName: '',
      description: '',
      writer: '',
      imageUrl: '',
      image: null,
      director: ''
    }
  },
  computed: {
    directoreErrors () {

    },
    movieNameErrors () {
      const error = []
      return error
    },
    descErrors () {
      const error = []
      return error
    },
    writerErrors () {
      const error = []
      return error
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      let files = event.target.files
      let fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Please add valid file')
      }
      let fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      console.log(this.image.name)
    }
  }
}
</script>

