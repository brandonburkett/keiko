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
        meaning: 'Second / seppuku assistant',
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
      {
        name: 'Yokogumo',
        kanji: '横雲',
        meaning: 'Cloud bank / long trailing clouds',
        seriesKey: 'chuden',
        order: 1,
      },
      {
        name: 'Toranoissoku',
        kanji: '虎一足',
        meaning: "One leg of a tiger / Tiger's step",
        seriesKey: 'chuden',
        order: 2,
      },
      {
        name: 'Inazuma',
        kanji: '稲妻',
        meaning: 'Lighting',
        seriesKey: 'chuden',
        order: 3,
      },
      {
        name: 'Ukigumo',
        kanji: '浮雲',
        meaning: 'Floating cloud',
        seriesKey: 'chuden',
        order: 4,
      },
      {
        name: 'Oroshi',
        kanji: '颪',
        meaning: 'Mountain wind / wind descending',
        seriesKey: 'chuden',
        order: 5,
      },
      {
        name: 'Iwanami',
        kanji: '岩波',
        meaning: 'Waves breaking against rocks',
        seriesKey: 'chuden',
        order: 6,
      },
      {
        name: 'Urokogaeshi',
        kanji: '鱗返',
        meaning: 'Sudden turn / fish scales turned back',
        seriesKey: 'chuden',
        order: 7,
      },
      {
        name: 'Namigaeshi',
        kanji: '波返',
        meaning: 'Returning wave',
        seriesKey: 'chuden',
        order: 8,
      },
      {
        name: 'Takiotoshi',
        kanji: '瀧落',
        meaning: 'Cascading waterfall',
        seriesKey: 'chuden',
        order: 9,
      },
      {
        name: 'Makko',
        kanji: '真向',
        meaning: 'Face to face',
        seriesKey: 'chuden',
        order: 10,
      },
      // {
      //   name: '',
      //   kanji: '',
      //   meaning: '',
      //   seriesKey: '',
      //   order: 0,
      // },
    ],
    series: {
      shoden: {
        name: 'Shoden Waza',
        kanji: '初傳技',
      },
      chuden: {
        name: 'Chuden Waza',
        kanji: '中傳技',
      },
    },
    // array of indexes for the completed kata list
    completed: {},
  },
  mutations: {
    markComplete: (state, { seriesKey, order }) => {
      state.completed = { ...state.completed, [`${seriesKey}-${order}`]: true };
    },
    resetComplete: state => {
      state.completed = {};
    },
  },
  getters: {
    getSeries: state => key => state.series[key],
    total: state => state.list.length,
    completedTotal: state => Object.keys(state.completed).length,
    percentComplete: state =>
      (Object.keys(state.completed).length / state.list.length).toLocaleString('en-us', {
        style: 'percent',
      }),
    remaining: state => state.list.length - Object.keys(state.completed).length,

    // get next kata that has not already been completed
    nextKata: state => () => {
      const remainingKata = state.list.filter(
        kata => !state.completed[`${kata.seriesKey}-${kata.order}`],
      );

      // none left
      if (remainingKata.length === 0) {
        return null;
      }

      // last one, no need for rand
      if (remainingKata.length === 1) {
        return remainingKata[0];
      }

      // rand
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
