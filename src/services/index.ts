export const getData = async (url: string) => {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      next: {
        tags: ["news"],
        // revalidate: 30,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
