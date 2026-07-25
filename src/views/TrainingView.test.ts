import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory, type Router } from 'vue-router';

import TrainingView from './TrainingView.vue';
import { useWazaStore } from '@/stores/wazaStore';

function buildRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div>home</div>' } },
      { path: '/training', name: 'training', component: TrainingView },
    ],
  });
}

const mounted: { unmount: () => void }[] = [];

// attachTo keeps isVisible() meaningful, jsdom reports detached nodes as hidden either way
async function mountTraining(query = '?series=shoden&order=sequential') {
  const pinia = createPinia();
  setActivePinia(pinia);
  const router = buildRouter();
  await router.push(`/training${query}`);
  await router.isReady();

  const wrapper = mount(TrainingView, {
    global: { plugins: [pinia, router] },
    attachTo: document.body,
  });
  mounted.push(wrapper);
  await flushPromises();

  return { wrapper, router, store: useWazaStore() };
}

function clickLabelled(
  wrapper: Awaited<ReturnType<typeof mountTraining>>['wrapper'],
  label: string,
) {
  const button = wrapper.findAll('button').find((candidate) => candidate.text() === label);
  if (!button) {
    throw new Error(`no button labelled "${label}"`);
  }
  return button.trigger('click');
}

describe('TrainingView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    mounted.splice(0).forEach((wrapper) => wrapper.unmount());
  });

  describe('mount', () => {
    it('reads series and order from the query string', async () => {
      const { store } = await mountTraining('?series=chuden&order=sequential');

      expect(store.selectedSeries).toBe('chuden');
      expect(store.selectedOrder).toBe('sequential');
    });

    it('falls back to all and random when the query is absent', async () => {
      const { store } = await mountTraining('');

      expect(store.selectedSeries).toBe('all');
      expect(store.selectedOrder).toBe('random');
    });

    it('shows the first waza of the series immediately', async () => {
      const { wrapper } = await mountTraining();

      expect(wrapper.find('h1').text()).toBe('前');
      expect(wrapper.find('h2').text()).toBe('Mae');
    });
  });

  describe('next', () => {
    it('marks the current waza complete and advances', async () => {
      const { wrapper, store } = await mountTraining();
      expect(store.completedTotal).toBe(0);

      await clickLabelled(wrapper, 'Next ⇒');

      expect(store.completedTotal).toBe(1);
      expect(wrapper.find('h2').text()).toBe('Migi');
    });

    it('shows the finished state once the series runs out', async () => {
      const { wrapper, store } = await mountTraining();
      const total = store.total;

      for (let i = 0; i < total; i++) {
        await clickLabelled(wrapper, 'Next ⇒');
      }

      expect(wrapper.text()).toContain('Awesome Job!');
      expect(store.remaining).toBe(0);
    });
  });

  describe('details', () => {
    // the details paragraph uses v-show, so it stays in the DOM and only toggles visibility
    it('hides the meaning until Details is clicked', async () => {
      const { wrapper } = await mountTraining();
      const details = wrapper.find('p.text-xl');
      expect(details.text()).toContain('Front');
      expect(details.isVisible()).toBe(false);

      await clickLabelled(wrapper, 'Details');

      expect(wrapper.find('p.text-xl').isVisible()).toBe(true);
    });

    it('re-hides the details on the next waza', async () => {
      const { wrapper } = await mountTraining();
      await clickLabelled(wrapper, 'Details');
      expect(wrapper.find('p.text-xl').isVisible()).toBe(true);

      await clickLabelled(wrapper, 'Next ⇒');

      expect(wrapper.find('p.text-xl').isVisible()).toBe(false);
    });

    it('brings the Details button back for the next waza', async () => {
      const { wrapper } = await mountTraining();
      await clickLabelled(wrapper, 'Details');
      expect(wrapper.findAll('button').map((button) => button.text())).not.toContain('Details');

      await clickLabelled(wrapper, 'Next ⇒');

      expect(wrapper.findAll('button').map((button) => button.text())).toContain('Details');
    });
  });

  describe('restart', () => {
    it('clears progress and returns home', async () => {
      const { wrapper, router, store } = await mountTraining();
      await clickLabelled(wrapper, 'Next ⇒');
      expect(store.completedTotal).toBe(1);

      await clickLabelled(wrapper, 'Restart');
      await flushPromises();

      expect(store.completedTotal).toBe(0);
      expect(router.currentRoute.value.path).toBe('/');
    });
  });
});
