export const getData = async (url: string) => {
  const res = await fetch(url, {
    cache: "no-store",
    next: {
      tags: ["news"],
      // revalidate: 30,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  } else {
    const data = await res.json();
    return data;
  }
};
