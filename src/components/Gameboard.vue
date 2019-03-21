<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-actions></v-card-actions>
        <v-container value="grid-list-sm" fluid>
          <v-layout row wrap>
            <v-flex v-for="n in 9" :key="n" xs4>
              <v-card flat tile>
                <v-img :src="getRandomCockroachImage()" height="150px"></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    name: 'Gameboard',
    props: {},
    data: () => ({
        numberOfRoachOptions:  5
    }),
    methods: {
        getRandomCockroachImage() {
            const randomImageIndex = Math.floor(Math.random() * this.numberOfRoachOptions) + 1;
            return require(`../assets/roaches/roach-${randomImageIndex}.jpg`);
        }
    }
}
</script>

<style>
</style>
