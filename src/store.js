import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Kata Module
 * ambiguous: true = kata name is in multiple series
 */
const kata = {
  namespaced: true,

  state: {
    list: [
      {
        name: 'Mae',
        kanji: '前',
        meaning: 'Front',
        seriesKey: 'shoden',
        order: 1,
      },
      {
        name: 'Migi',
        kanji: '右',
        meaning: 'Right',
        seriesKey: 'shoden',
        order: 2,
      },
      {
        name: 'Hidari',
        kanji: '左',
        meaning: 'Left',
        seriesKey: 'shoden',
        order: 3,
      },
      {
        name: 'Ushiro',
        kanji: '後',
        meaning: 'Rear / behind',
        seriesKey: 'shoden',
        order: 4,
      },
      {
        name: 'Yaegaki',
        kanji: '八重垣',
        meaning: 'Barriers within barriers',
        seriesKey: 'shoden',
        ambiguous: true,
        order: 5,
      },
      {
        name: 'Ukenagashi',
        kanji: '受流',
        meaning: 'Flowing block / receive and deflect',
        seriesKey: 'shoden',
        ambiguous: true,
        order: 6,
      },
      {
        name: 'Kaishaku',
        kanji: '介錯',
        meaning: 'Second / seppuku assistan',
        seriesKey: 'shoden',
        order: 7,
      },
      {
        name: 'Tsukekomi',
        kanji: '附込',
        meaning: 'Seize opportunity / pursuit',
        seriesKey: 'shoden',
        order: 8,
      },
      {
        name: 'Tsukikage',
        kanji: '月影',
        meaning: 'Moon shadow',
        seriesKey: 'shoden',
        order: 9,
      },
      {
        name: 'Oikaze',
        kanji: '追風',
        meaning: 'Chasing wind / tailwind',
        seriesKey: 'shoden',
        order: 10,
      },
      {
        name: 'Nukiuchi',
        kanji: '抜打',
        meaning: 'Draw and strike',
        seriesKey: 'shoden',
        order: 11,
      },
    ],
    series: {
      shoden: {
        name: 'Shoden Waza',
        kanji: '初傳技',
      },
    },
    // array of indexes for the completed kata list
    completed: [],
  },
  mutations: {
    markComplete: (state, listIndex) => state.completed.push(listIndex),
  },
  getters: {
    getSeries: state => key => state.series[key],
    completedTotal: state => state.completed.length,
    remaining: state => state.list.length - state.completed.length,

    // get next kata that has not already been completed
    nextKata: state => {
      const remainingKata = state.list.filter((kata, index) => !state.completed.includes(index));
      const min = 0;
      const max = remainingKata.length;
      const next = Math.floor(Math.random() * (max - min)) + min;

      return remainingKata[next];
    },
  },
};

export default new Vuex.Store({
  modules: {
    kata,
  },
});
