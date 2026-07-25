import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import BaseButton from './BaseButton.vue';

describe('BaseButton', () => {
  it('renders the label', () => {
    const wrapper = mount(BaseButton, { props: { label: 'Next waza' } });

    expect(wrapper.text()).toBe('Next waza');
  });

  it('swaps the label while loading', () => {
    const wrapper = mount(BaseButton, { props: { label: 'Next waza', loading: true } });

    expect(wrapper.text()).toBe('Loading...');
  });

  it('emits button-action on click', async () => {
    const wrapper = mount(BaseButton, { props: { label: 'Next waza' } });
    await wrapper.trigger('click');

    expect(wrapper.emitted('button-action')).toHaveLength(1);
  });

  it('applies the inverted style and large size', () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Reset', styleType: 'inverted', size: 'large' },
    });
    const classes = wrapper.classes();

    expect(classes).toContain('bg-gray-100');
    expect(classes).toContain('text-xl');
  });

  // exercises the js-beautify path inside test-utils
  it('serializes to html', () => {
    const wrapper = mount(BaseButton, { props: { label: 'Next waza' } });

    expect(wrapper.html()).toContain('<button');
    expect(wrapper.html()).toContain('aria-live="polite"');
  });
});
