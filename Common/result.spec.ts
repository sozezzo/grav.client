import { Result } from './result';

describe('Result', () => {
  let result: Result<Boolean>;
  beforeEach(() => {
    result = Result.Ok<Boolean>(true);
  })
  it('should work', () => {
    expect(result.DidSucceed).toBe(true);
  })
})
