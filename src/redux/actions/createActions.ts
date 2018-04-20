function createActions(name: string) {
  return {
    _: name,
    start: `${name}_START`,
    ok: `${name}_OK`,
    fail: `${name}_FAIL`,
  };
}

export default createActions;
