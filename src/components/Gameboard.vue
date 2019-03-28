<template>
  <div>
    <v-layout justify-center v-if="isLoading">
      <v-flex>
        <v-layout fill-height>
          <v-flex>
            <v-progress-circular indeterminate color="red"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout v-if="!isLoading" :column="$vuetify.breakpoint.xsOnly" justify-center>
      <v-flex xs2 sm2>
        <v-layout :column="$vuetify.breakpoint.smAndUp" fill-height>
          <v-flex sm2 pb-5 d-inline-flex>
            <v-layout>
              <v-flex xs8 :class="[$vuetify.breakpoint.xsOnly ? 'ml-2' : '']">
                <v-slider
                  v-model="difficulty"
                  :tick-labels="levels"
                  max="2"
                  step="1"
                  color="red darken-2"
                  thumb-color="red darken-2"
                  ticks="always"
                  tick-size="1"
                  :disabled="isRunning"
                ></v-slider>
              </v-flex>
              <v-flex xs4>
                <v-btn
                  class="ml-4"
                  color="red darken-2"
                  :disabled="isRunning"
                  large
                  icon
                  @click="startGame"
                >
                  <v-icon large>{{ isRunning ? 'pause_circle_outline' : 'play_circle_outline' }}</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex sm2>
            <div>
              <div class="font-weight-bold subheading">High score</div>
              <div
                :class="['red--darken-2--text', $vuetify.breakpoint.smAndUp ? 'headline pt-10' : 'subheading']"
              >{{ currentHighScore }}</div>
            </div>
          </v-flex>
          <v-flex sm6 v-if="$vuetify.breakpoint.smAndUp">
            <v-card>
              <v-card-title class="subheading font-weight-bold">Scoreboard</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile v-for="score in highScores" :key="score.id">
                  <v-list-tile-content>{{ score.playerId }}</v-list-tile-content>
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
              <v-flex v-for="tile in gameTiles" :key="tile.id" xs4>
                <v-card flat tile>
                  <v-img :src="tile.imageSrc" height="150px" @click="smash(tile.id)"></v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Gameboard',
  props: {},
  data: () => ({}),
  methods: {
    startGame() {
      this.$store.dispatch('START_GAME');
    },
    smash(tileId) {
      this.$store.dispatch('SMASH_ROACH', tileId);
    }
  },
  computed: {
    isRunning: {
      get() {
        return this.game.isRunning;
      }
    },
    levels: {
      get() {
        return this.levelLabels;
      }
    },
    difficulty: {
      set(level) {
        this.$store.commit('setDifficulty', level);
      },
      get() {
        return this.game.difficulty;
      }
    },
    ...mapState(['config', 'game', 'isLoading', 'isSaving']),
    ...mapGetters([
      'gameTiles',
      'levelLabels',
      'currentUser',
      'currentHighScore',
      'highScores'
    ])
  },
  created() {
    this.$store.dispatch('INIT_GAME');
    this.$store.dispatch('LISTEN_HIGH_SCORES');
  }
};
</script>

<style>
</style>
