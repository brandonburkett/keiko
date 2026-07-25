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
  });
});
