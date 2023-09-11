type Articles = {
    title: string;
    url: string;
    id: string;
};

export async function getArticles(count: number) {
    const response = await fetch(`https://qiita.com/api/v2/users/daisuke-yamamoto/items?page=1&per_page=${count}`);
    const qiitaItems: any[] = await response.json();
    const articles: Articles[] = qiitaItems.map(item => ({
      title: item.title,
      url: item.url,
      id: item.id,
    }));
    return articles;
}
