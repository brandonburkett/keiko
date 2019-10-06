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
        order: 5,
        ambiguous: true,
      },
      {
        name: 'Ukenagashi',
        kanji: '受流',
        meaning: 'Flowing block / receive and deflect',
        seriesKey: 'shoden',
        order: 6,
        ambiguous: true,
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
        ambiguous: true,
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
      {
        name: 'Yukizure',
        kanji: '行連',
        meaning: 'Escorted',
        seriesKey: 'okudenTachi',
        order: 1,
      },
      {
        name: 'Tsuredachi',
        kanji: '連達',
        meaning: 'Companions',
        seriesKey: 'okudenTachi',
        order: 2,
      },
      {
        name: 'Somakuri',
        kanji: '惣捲',
        meaning: 'All around',
        seriesKey: 'okudenTachi',
        order: 3,
      },
      {
        name: 'Sodome',
        kanji: '惣留',
        meaning: 'Stop everything',
        seriesKey: 'okudenTachi',
        order: 4,
      },
      {
        name: 'Shinobu',
        kanji: '信夫',
        meaning: 'Stealthy',
        seriesKey: 'okudenTachi',
        order: 5,
      },
      {
        name: 'Yukichigai',
        kanji: '行違',
        meaning: 'Passing by',
        seriesKey: 'okudenTachi',
        order: 6,
      },
      {
        name: 'Sodesurigaeshi',
        kanji: '袖摺返',
        meaning: 'Brushing / Flipping Sleeves',
        seriesKey: 'okudenTachi',
        order: 7,
      },
      {
        name: 'Moniri',
        kanji: '門入',
        meaning: 'Entrance gate / Entering the gate',
        seriesKey: 'okudenTachi',
        order: 8,
      },
      {
        name: 'Kabezoe',
        kanji: '壁添',
        meaning: 'Against the wall',
        seriesKey: 'okudenTachi',
        order: 9,
      },
      {
        name: 'Ukenagashi',
        kanji: '受流',
        meaning: 'Flowing block',
        seriesKey: 'okudenTachi',
        order: 10,
        ambiguous: true,
      },
      {
        name: 'Itomagoi sono ichi',
        kanji: '暇乞一',
        meaning: 'Farewell visit',
        seriesKey: 'okudenTachi',
        order: 11,
      },
      {
        name: 'Itomagoi sono ni',
        kanji: '暇乞二',
        meaning: 'Farewell visit',
        seriesKey: 'okudenTachi',
        order: 12,
      },
      {
        name: 'Itomagoi sono san',
        kanji: '暇乞三',
        meaning: 'Farewell visit',
        seriesKey: 'okudenTachi',
        order: 13,
      },
      {
        name: 'Kasumi',
        kanji: '霞',
        meaning: 'Haze',
        seriesKey: 'okudenSuwari',
        order: 1,
      },
      {
        name: 'Sunegakoi',
        kanji: '脛囲',
        meaning: 'Shin protection',
        seriesKey: 'okudenSuwari',
        order: 2,
      },
      {
        name: 'Tozume',
        kanji: '戸詰',
        meaning: 'Boxed in by doors',
        seriesKey: 'okudenSuwari',
        order: 3,
      },
      {
        name: 'Towaki',
        kanji: '戸脇',
        meaning: 'Beside the door',
        seriesKey: 'okudenSuwari',
        order: 4,
      },
      {
        name: 'Shihogiri',
        kanji: '四方切',
        meaning: 'Four direction cut',
        seriesKey: 'okudenSuwari',
        order: 5,
      },
      {
        name: 'Tanashita',
        kanji: '棚下',
        meaning: 'Beneath a shelf',
        seriesKey: 'okudenSuwari',
        order: 6,
      },
      {
        name: 'Ryozume',
        kanji: '両詰',
        meaning: 'Boxed in on both sides',
        seriesKey: 'okudenSuwari',
        order: 7,
      },
      {
        name: 'Torabashiri',
        kanji: '虎走',
        meaning: 'Running tiger / Tiger returning to lair',
        seriesKey: 'okudenSuwari',
        order: 8,
      },
      {
        name: '',
        kanji: '',
        meaning: '',
        seriesKey: '',
        order: 0,
      },
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
      okudenTachi: {
        name: 'Okuden Tachiwaza',
        kanji: '奥傳立技',
      },
      okudenSuwari: {
        name: 'Okuden Suwariwaza',
        kanji: '奥傳座技',
      },
      toho: {
        name: 'Toho Waza',
        kanji: '刀法技',
      },
      toryuBangai: {
        name: 'Toryu Bangai',
        kanji: '当流番外 ',
      },
      bangai: {
        name: 'Bangai',
        kanji: '番外 ',
      },
      tsumeIai: {
        name: 'Tsume Iai Kumitachi',
        kanji: '詰居合',
      },
      nanahon: {
        name: 'Nanahon Kumitachi',
        kanji: '七本 ',
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
