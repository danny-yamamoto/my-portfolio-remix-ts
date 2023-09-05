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
    return res;
}

