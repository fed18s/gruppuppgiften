export default function mockCollection() {
  return {
    all: jest.fn().mockReturnValue([]),
    find: jest.fn()
      .mockReturnValueOnce({ id: 0, name: 'test' })
      .mockReturnValueOnce({ id: 0, name: 'test' })
      .mockReturnValue(-1),
    push: jest.fn().mockReturnValue(1),
  };
}
