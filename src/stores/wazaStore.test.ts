import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { useWazaStore } from './wazaStore';

describe('wazaStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('total', () => {
    it('counts every waza when no series is selected', () => {
      const store = useWazaStore();

      expect(store.total).toBe(store.list.length);
    });

    it('counts only the selected series', () => {
      const store = useWazaStore();
      store.setSeriesFocus('shoden');

      expect(store.total).toBe(store.list.filter((waza) => waza.seriesKey === 'shoden').length);
    });

    it('returns 0 for an unknown series', () => {
      const store = useWazaStore();
      store.setSeriesFocus('nope');

      expect(store.total).toBe(0);
    });
  });

  describe('nextWaza', () => {
    it('walks the selected series in order when sequential', () => {
      const store = useWazaStore();
      store.setSeriesFocus('shoden');
      store.setOrder('sequential');

      const first = store.nextWaza;
      expect(first?.order).toBe(1);

      store.markComplete({ seriesKey: first!.seriesKey, order: first!.order });
      expect(store.nextWaza?.order).toBe(2);
    });

    it('stays inside the selected series when random', () => {
      const store = useWazaStore();
      store.setSeriesFocus('shoden');
      store.setOrder('random');

      expect(store.nextWaza?.seriesKey).toBe('shoden');
    });

    it('returns null once everything is complete', () => {
      const store = useWazaStore();
      store.setSeriesFocus('shoden');
      store.list
        .filter((waza) => waza.seriesKey === 'shoden')
        .forEach((waza) => store.markComplete({ seriesKey: waza.seriesKey, order: waza.order }));

      expect(store.nextWaza).toBeNull();
    });
  });

  describe('progress', () => {
    it('tracks completed, remaining, and percent together', () => {
      const store = useWazaStore();
      store.setSeriesFocus('shoden');
      const total = store.total;

      store.markComplete({ seriesKey: 'shoden', order: 1 });

      expect(store.completedTotal).toBe(1);
      expect(store.remaining).toBe(total - 1);
      expect(store.percentComplete).toBe((1 / total).toLocaleString('en-us', { style: 'percent' }));
    });

    it('resetComplete clears progress', () => {
      const store = useWazaStore();
      store.markComplete({ seriesKey: 'shoden', order: 1 });
      store.resetComplete();

      expect(store.completedTotal).toBe(0);
    });

    it('is idempotent, re-marking the same waza does not double count', () => {
      const store = useWazaStore();
      store.markComplete({ seriesKey: 'shoden', order: 1 });
      store.markComplete({ seriesKey: 'shoden', order: 1 });

      expect(store.completedTotal).toBe(1);
    });
  });

  describe('series lookups', () => {
    it('seriesByKey returns the series', () => {
      const store = useWazaStore();

      expect(store.seriesByKey('shoden')).toEqual({ name: 'Shoden Waza', kanji: '初伝技' });
    });

    it('seriesList turns the series map into options carrying key and value', () => {
      const store = useWazaStore();
      const list = store.seriesList;

      expect(list.length).toBe(Object.keys(store.series).length);
      list.forEach((series) => {
        expect(series.key).toBe(series.value);
        expect(store.series[series.key].name).toBe(series.name);
      });
    });

    it('every waza points at a series that exists', () => {
      const store = useWazaStore();

      store.list.forEach((waza) => {
        expect(store.series[waza.seriesKey], `${waza.name} -> ${waza.seriesKey}`).toBeDefined();
      });
    });

    it('has no duplicate seriesKey and order pairs', () => {
      const store = useWazaStore();
      const keys = store.list.map((waza) => `${waza.seriesKey}-${waza.order}`);

      expect(new Set(keys).size).toBe(keys.length);
    });
  });
});
