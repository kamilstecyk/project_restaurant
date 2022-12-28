import { MinMaxFilteringPipe } from './min-max-filtering.pipe';

describe('MinMaxFilteringPipe', () => {
  it('create an instance', () => {
    const pipe = new MinMaxFilteringPipe();
    expect(pipe).toBeTruthy();
  });
});
