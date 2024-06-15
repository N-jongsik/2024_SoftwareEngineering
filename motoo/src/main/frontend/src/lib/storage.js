const storage = {
  set: (key, object) => {
    if (!localStorage) return;
    localStorage.setItem(key, JSON.stringify(object));
  },
  get: (key) => {
    if (!localStorage) return null;
    const value = localStorage.getItem(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  },
  remove: (key) => {
    if (!localStorage) return;
    localStorage.removeItem(key);
  }
};

export default storage;
