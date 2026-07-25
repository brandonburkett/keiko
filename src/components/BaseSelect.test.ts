import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import BaseSelect from './BaseSelect.vue';

const options = [
  { key: 'all', value: 'all', name: 'All' },
  { key: 'shoden', value: 'shoden', name: 'Shoden' },
];

function mountSelect(modelValue = 'all') {
  return mount(BaseSelect, {
    props: { name: 'series', label: 'Select Series', modelValue, options },
  });
}

describe('BaseSelect', () => {
  it('renders one option per entry', () => {
    const wrapper = mountSelect();
    const rendered = wrapper.findAll('option');

    expect(rendered).toHaveLength(2);
    expect(rendered.map((option) => option.text())).toEqual(['All', 'Shoden']);
  });

  it('binds the current model value', () => {
    const wrapper = mountSelect('shoden');

    expect(wrapper.find('select').element.value).toBe('shoden');
  });

  it('emits update:modelValue with the chosen value', async () => {
    const wrapper = mountSelect();

    await wrapper.find('select').setValue('shoden');

    expect(wrapper.emitted('update:modelValue')).toEqual([['shoden']]);
  });

  it('labels the select for assistive tech', () => {
    const wrapper = mountSelect();
    const select = wrapper.find('select');

    expect(select.attributes('aria-label')).toBe('Select Series');
    expect(select.attributes('name')).toBe('series');
  });
});
