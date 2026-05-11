export const saveToLocalStorage = <T>(
  key: string,
  data: T
): void => {
  localStorage.setItem(
    key,
    JSON.stringify(data)
  );
};

export const getFromLocalStorage = <T>(
  key: string,
  fallback: T
): T => { const data = localStorage.getItem(key);

  if (!data) return fallback;

  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(
      "LocalStorage parse error:",
      error
    );

    return fallback;
  }
};