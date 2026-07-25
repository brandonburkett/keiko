import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import ProgressBar from './ProgressBar.vue';

function mountBar(props = { total: 11, completedTotal: 3, percentComplete: '27%' }) {
  return mount(ProgressBar, { props });
}

describe('ProgressBar', () => {
  it('exposes progress to assistive tech', () => {
    const bar = mountBar().find('[role="progressbar"]');

    expect(bar.attributes('aria-valuenow')).toBe('3');
    expect(bar.attributes('aria-valuemin')).toBe('0');
    expect(bar.attributes('aria-valuemax')).toBe('11');
  });

  it('sizes the fill from percentComplete', () => {
    const fill = mountBar().find('span');

    expect(fill.attributes('style')).toContain('width: 27%');
  });

  it('shows the percent and the completed count', () => {
    const text = mountBar().text();

    expect(text).toContain('27%');
    expect(text).toContain('3 / 11');
  });

  it('renders an empty bar at zero', () => {
    const wrapper = mountBar({ total: 11, completedTotal: 0, percentComplete: '0%' });

    expect(wrapper.find('span').attributes('style')).toContain('width: 0%');
    expect(wrapper.text()).toContain('0 / 11');
  });
});
