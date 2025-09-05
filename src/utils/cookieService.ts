import Cookies from "js-cookie";

export const cookieService = {
  set: (name: string, value: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(name, value, options);
  },
  get: (name: string) => {
    return Cookies.get(name);
  },
  remove: (name: string) => {
    Cookies.remove(name);
  },
};
