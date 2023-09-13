type Experience = {
    id: string;
    company: string;
    position: string;
}

export async function getExperience() {
    const experience: Experience[] = [
      {
          id: '2022-09',
          company: 'Retail AI X Inc.',
          position: 'Lead Engineer',
      },
      {
          id: '2021-06',
          company: 'Retail AI X Inc.',
          position: 'Software Engineer',
      },
      {
          id: '2020-06',
          company: 'Retail AI Engineering Inc.',
          position: 'Software Engineer',
      }
    ]
    return experience;
}
