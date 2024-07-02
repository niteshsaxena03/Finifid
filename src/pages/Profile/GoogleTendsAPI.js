
let currentDate ; 
async function getTrendingSearches() {
  const apiUrl = `http://localhost:3000/trends`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trending searches');
    }

    const text = await response.text();
    const json = JSON.parse(text.slice(5)); 
    

    let currentTrends = json.default.trendingSearchesDays[0].trendingSearches;
    currentDate = json.default.trendingSearchesDays[0].formattedDate  ;

    currentTrends = currentTrends.sort(() => 0.5 - Math.random());

    let selectedTrends = currentTrends.slice(0, 5);

    let Trends = selectedTrends.map((data) => ({
      title: data.title.query,
      userTraffic: data.formattedTraffic,
      image: data.image.imageUrl,
      source: data.image.source,
      newsLink: data.articles[0]?.url,
    }));

    return Trends;
  } catch (error) {
    console.error('Error fetching trending searches:', error);
    return [];
  }
}

export default getTrendingSearches;
export {currentDate} ; 
