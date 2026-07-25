import { describe, it, expect, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';

import App from './App.vue';
import HomeView from './views/HomeView.vue';

// mirrors src/router/index.ts, memory history so the router works headless
function buildRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: HomeView },
      { path: '/training', name: 'training', component: () => import('./views/TrainingView.vue') },
    ],
  });
}

describe('app smoke', () => {
  let router: ReturnType<typeof buildRouter>;

  beforeEach(async () => {
    router = buildRouter();
    await router.push('/');
    await router.isReady();
  });

  it('boots the home route with pinia and the router installed', async () => {
    const wrapper = mount(App, { global: { plugins: [createPinia(), router] } });
    await flushPromises();

    expect(wrapper.text()).toContain('Keiko');
    expect(wrapper.find('h1').exists()).toBe(true);
  });

  it('navigates to the lazily loaded training route and picks a waza', async () => {
    const wrapper = mount(App, { global: { plugins: [createPinia(), router] } });

    await router.push('/training?series=shoden&order=sequential');
    await flushPromises();

    // sequential order means the first shoden waza, Mae
    expect(wrapper.text()).toContain('Mae');
  });

  it('reads query params into the store on the training route', async () => {
    mount(App, { global: { plugins: [createPinia(), router] } });

    await router.push('/training?series=chuden&order=sequential');
    await flushPromises();

    expect(router.currentRoute.value.query.series).toBe('chuden');
  });
});
