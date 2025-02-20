import MockRedis from 'ioredis';

describe('linsert', () => {
  it('should add the value to the list at the correct position', () => {
    const redis = new MockRedis({
      data: {
        foo: ['1'],
      },
    });

    return redis
      .linsert('foo', 'BEFORE', 1, 0)
      .then(() => expect(redis.data.get('foo')).toEqual(['0', '1']))
      .then(() => redis.linsert('foo', 'AFTER', 1, 2))
      .then(() => expect(redis.data.get('foo')).toEqual(['0', '1', '2']));
  });

  it('should return the new length of the list', () => {
    let redis = new MockRedis({
      data: {},
    });

    return redis
      .linsert('foo', 'BEFORE', 1, 0)
      .then((length) => expect(length).toBe(-1))
      .then(() => {
        redis = new MockRedis({
          data: { foo: ['1'] },
        });
      })
      .then(() => redis.linsert('foo', 'BEFORE', 1, 0))
      .then((length) => expect(length).toBe(2));
  });

  it('should throw an exception if the key contains something other than a list', () => {
    const redis = new MockRedis({
      data: {
        foo: 'not a list',
      },
    });

    return redis
      .linsert('foo', 'BEFORE', 1, 0)
      .catch((err) =>
        expect(err.message).toBe('Key foo does not contain a list')
      );
  });

  it('should throw an exception if the position is not allowed', () => {
    const redis = new MockRedis({
      data: {},
    });

    return redis
      .linsert('foo', 'POSITION_UNKNOWN', 1, 0)
      .catch((err) =>
        expect(err.message).toBe(
          'The position of the new element must be BEFORE the pivot or AFTER the pivot'
        )
      );
  });
});
