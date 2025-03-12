'use server';

export type DockerImage = {
  name: string;
  tags: DockerImageTag[];
};

export type DockerImageTag = {
  id: number;
  name: string;
  full_size: number;
};

export type State = {
  data?: DockerImage;
  error?: string;
};

const BASE_URL = 'https://hub.docker.com/v2/repositories/';
const CUSTOM_REPO_REGEX = /[a-z\d]{4,30}\/[a-zA-Z\d][a-zA-Z\d_.-]{0,254}/;

function usesCustomRepo(imageName: string) {
  return CUSTOM_REPO_REGEX.test(imageName);
}

async function fetchImageName(image: string): Promise<string> {
  const res = await fetch(`${BASE_URL}${image}/`);

  if (res.status === 404) {
    throw new Error('Could not find image.');
  }

  const data = await res.json();
  return data.name;
}

async function fetchImageTags(image: string): Promise<DockerImageTag[]> {
  const res = await fetch(`${BASE_URL}${image}/tags/`);

  if (res.status === 404) {
    throw new Error('Could not find image.');
  }

  const data = await res.json();
  return data.results as DockerImageTag[];
}

export async function getImageData(
  prevState: State,
  formData: FormData
): Promise<State> {
  const userInput = formData.get('image-name') as string;
  const imageName = usesCustomRepo(userInput)
    ? userInput
    : `library/${userInput}`;

  try {
    const [name, tags] = await Promise.all([
      fetchImageName(imageName),
      fetchImageTags(imageName),
    ]);

    return { data: { name, tags } };
  } catch (error: any) {
    return { error: error.message };
  }
}
