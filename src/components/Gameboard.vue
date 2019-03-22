<template>
  <v-layout :column="$vuetify.breakpoint.xsOnly" justify-center>
    <v-flex xs2 sm2>
      <v-layout :column="$vuetify.breakpoint.smAndUp" fill-height>
        <v-flex sm2 pb-5 d-inline-flex>
          <v-layout>
            <v-flex xs8>
              <v-slider
                v-model="difficultyLevel"
                :tick-labels="levelLabels"
                :max="2"
                step="1"
                color="red"
                thumb-color="red"
                ticks="always"
                tick-size="2"
              ></v-slider>
            </v-flex>
            <v-flex xs4>
              <v-btn color="red" large icon>
                <v-icon large>play_circle_outline</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <div
          pb-10
          :class="['hidden-xs-only pb-2 font-weight-bold brown--text', $vuetify.breakpoint.smAndUp ? 'headline' : 'subheading']"
        >Scoreboard</div>
        <v-flex sm2>
          <div>
            <div class="font-weight-bold subheading">Current user</div>
            <div
              :class="['red--text', $vuetify.breakpoint.smAndUp ? 'headline pt-10' : 'subheading']"
            >{{ currentUser.name }}</div>
          </div>
        </v-flex>
        <v-flex sm2>
          <div>
            <div class="font-weight-bold subheading">Your high score</div>
            <div
              :class="['red--text', $vuetify.breakpoint.smAndUp ? 'headline pt-10' : 'subheading']"
            >{{ currentHighScore }}</div>
          </div>
        </v-flex>
        <v-flex sm6 v-if="$vuetify.breakpoint.smAndUp">
          <v-card>
            <v-card-title class="subheading font-weight-bold">High scores</v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile v-for="score in highScores" :key="score.id">
                <v-list-tile-content>{{ score.name }}</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ score.score }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs10 sm8 offset-sm1>
      <v-card>
        <v-card-actions></v-card-actions>
        <v-container grid-list-sm fluid>
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
import { mapGetters } from "vuex";

export default {
    name: 'Gameboard',
    props: {},
    data: () => ({
        difficultyLevel: 1,
        levelLabels: [
            'Easy', 'Medium', 'Hard'
        ],
        numberOfRoachOptions:  5
    }),
    methods: {
        getRandomCockroachImage() {
            const randomImageIndex = Math.floor(Math.random() * this.numberOfRoachOptions) + 1;
            return require(`../assets/roaches/roach-${randomImageIndex}.jpg`);
        }
    },
    computed: {
        ...mapGetters(['currentUser', 'currentHighScore', 'highScores'])
    }
}
</script>

<style>
</style>
