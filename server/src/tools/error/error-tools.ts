class errorTools {
  throwError(errors: { path: string; message: string }[]) {
    return {
      ok: false,
      errors,
    };
  }
}

export default new errorTools();
