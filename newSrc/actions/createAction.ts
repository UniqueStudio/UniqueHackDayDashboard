function createActions(name: string) {
  return {
    _: name,
    START: `${name}_START`,
    OK: `${name}_OK`,
    FAIL: `${name}_FAIL`,
  };
}

export default createActions;
