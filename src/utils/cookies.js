export const cookies = {
  // this will be an automatic return: () => ({}) -- called automatic return
  getOptions: () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000,
  }),

  // now we'll set the cookie
  set: (res, name, value, options = {}) => {
    res.cookie(name, value, { ...cookies.getOptions, ...options });
  },

  // to clear the cookies
  clear: (res, name, options = {}) => {
    res.clearCookie(name, { ...cookies.getOptions, ...options });
  },

  // get the cookie
  get: (req, name) => {
    return req.cookies[name];
  },
};
