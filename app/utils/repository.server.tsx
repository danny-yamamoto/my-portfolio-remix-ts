type Repositories = {
    name: string;
    description: string;
    url: string;
}


type InputDataType = {
  data: {
      viewer: {
          repositories: {
              nodes: Repositories[];
          }
      }
  }
}

export async function getRepositories() {
  const queryData = {
      query: `
      query {
          viewer {
            repositories(first: 20, ownerAffiliations: OWNER) {
              nodes {
                name
                description
                url
              }
            }
          }
        }
      `
  };

  const token = "";
  // User-Agent can be anything.
  const response = await fetch("https://api.github.com/graphql", {
      body: JSON.stringify(queryData),
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'User-Agent': 'MyCustomUserAgent' 
      },
      method: "POST",
  });
  const qiitaItems:InputDataType  = await response.json();
  const repositoriesArray: Repositories[] = qiitaItems.data.viewer.repositories.nodes;
  return repositoriesArray;
}

