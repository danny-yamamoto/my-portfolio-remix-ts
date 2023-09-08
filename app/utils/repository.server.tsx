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

export async function getRepositories(ghEndpoint: string, ghToken: string) {
  const queryData = {
      query: `
      query {
          viewer {
            repositories(first: 15, ownerAffiliations: OWNER) {
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

  // User-Agent can be anything.
  const response = await fetch(ghEndpoint, {
      body: JSON.stringify(queryData),
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ghToken}`,
          'User-Agent': 'MyCustomUserAgent' 
      },
      method: "POST",
  });
  const qiitaItems:InputDataType  = await response.json();
  const repositoriesArray: Repositories[] = qiitaItems.data.viewer.repositories.nodes;
  return repositoriesArray;
}

