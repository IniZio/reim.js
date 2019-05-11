import reim from '../src'

test('store a store', () => {
  const tstore = reim({abc: 12})

  expect(tstore.filter(s => s.abc)).toBe(12)
})

test('set', () => {
  const actions = {
    add: () => state => void (state.foo += 11),
    withbb: () => ({bb: 100})
  }

  const store = reim(
    {foo: 17, bb: 2},
    {actions}
  )

  store.add()

  expect(store.filter(s => s.foo)).toBe(28)

  store.withbb()

  expect(store.filter(s => s.foo)).toBe(28)
  expect(store.filter(s => s.bb)).toBe(100)
})

test('snapshot', () => {
  const store = reim({par: '123', bam: 942})

  expect(store.filter('par')).toBe('123')
  expect(store.filter(state => state.bam)).toBe(942)
})

describe('subscription', () => {
  test('subscribe to store', () => {
    const actions = {
      minus: () => state => void (state.mag -= 10)
    }

    const store = reim({mag: 75}, {actions})

    const updated = jest.fn()
    // Should be called on subscribe also for initial fetch
    store.subscribe(updated)
    store.minus()
    expect(updated).toBeCalledTimes(1)
  })

  test('unsubscribe from store', () => {
    const actions = {
      add: () => state => void (state.poi += 30),
      little: () => state => void (state.poi += 10)
    }

    const store = reim({poi: 500}, {actions})

    const updated = jest.fn()

    const handler = store.subscribe(updated)

    store.add()
    expect(updated).toBeCalledTimes(1)

    handler.unsubscribe()
    store.little()
    expect(updated).toBeCalledTimes(1)
  })
})

test('should be able to reset', () => {
  const actions = {
    hundred: () => ({count: 100})
  }

  const store = reim({count: 123}, {actions})

  store.hundred()
  store.reset()

  store.reset()

  expect(store.filter()).toMatchSnapshot()
})

test('should be able to reset to give value', () => {
  const actions = {
    hundred: () => ({count: 100})
  }

  const store = reim({count: 123}, {actions})

  store.reset({count: 999})

  expect(store.filter()).toMatchSnapshot()
})

describe('observable', () => {
  test('Use store as observable', () => {
    const store = reim({count: 123})

    const stream = store
    expect(stream.subscribe(() => {}).unsubscribe).toBeInstanceOf(Function)
  })
})
