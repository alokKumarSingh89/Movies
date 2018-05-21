<template>
    <v-flex row>
        <v-flex xs1 v-for="i in totalRate" :key="i.index">
            <v-icon>star_rate</v-icon>
        </v-flex>
    </v-flex>
</template>

<script>
export default {
    name: 'Rate',
    data () {
      return {
       totalRate:[1,2,3,4,5,6,7,8,9,10]
      }
    }
}
</script>
