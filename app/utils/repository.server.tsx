type repositories = {
    name: string;
    description: string;
    url: string;
}

export async function getRepositories() {
    const res: repositories[] = [
        {
            name: 'cosign-tutorial',
            description: 'A how-to guide for testing cosign on Google Kubernetes Engine.',
            url: '"https://github.com/danny-yamamoto/cosign-tutorial'
        }
    ]
    console.log(res);

    const queryData = {
        query: `
          query {
            person(personID:5) {
              name
              birthYear
              created
            }
          }
        `
    };
    console.log(queryData);
    const response = await fetch("https://swapi-graphql.netlify.app/.netlify/functions/index", {
        body: JSON.stringify(queryData),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    });
    const data = await response.json();
    console.log(data);

    //return res;
    return data;
}

