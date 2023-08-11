const ACCESS_KEY = "yXGDiOU97XQJlAr0_tTDuUxBPImj8GMIBnDiAq-7Lx4";

export default async function fetchImages(query, count) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}`,
      {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}
