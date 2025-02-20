import MockRedis from 'ioredis';

describe('setnx', () => {
  it('should set a key with value if it does not exist already', () => {
    const redis = new MockRedis();
    return redis
      .setnx('foo', 'bar')
      .then((status) => expect(status).toBe(1))
      .then(() => {
        expect(redis.data.get('foo')).toBe('bar');
        return redis.setnx('foo', 'baz');
      })
      .then((status) => expect(status).toBe(0))
      .then(() => {
        expect(redis.data.get('foo')).toBe('bar');
      });
  });
});
