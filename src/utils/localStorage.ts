export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      const data = JSON.parse(window.localStorage.getItem(key));
      return data;
    } catch (e) {
      console.log(e);
    }
  }
};

export const setLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  }
};
