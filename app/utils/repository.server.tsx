type Repositories = {
    name: string;
    description: string;
    url: string;
}


type Viewer = {
  data: {
      viewer: {
          repositories: {
              nodes: Repositories[];
          }
      }
  }
}

/**
 * @name getRepositories
 * @param ghEndpoint GitHub GraphQL API Endpoint
 * @param ghToken Personal Token
 * @returns 
 */
export async function getRepositories(ghEndpoint: string, ghToken: string) {
  // Repositories created by you
  const queryData = {
      query: `
      query {
          viewer {
            repositories(first: 10, ownerAffiliations: OWNER) {
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
  const viewerData:Viewer  = await response.json();
  const repositories: Repositories[] = viewerData.data.viewer.repositories.nodes;
  return repositories;
}

