import MockRedis from 'ioredis';

describe('flushall', () => {
  const redis = new MockRedis({
    data: {
      deleteme: 'please',
      metoo: 'pretty please',
    },
  });
  it('should empty current db', () =>
    redis
      .flushall()
      .then((status) => expect(status).toBe('OK'))
      .then(() => expect(redis.data.keys().length).toBe(0)));
  it.skip('should empty every db', () => {});
});
