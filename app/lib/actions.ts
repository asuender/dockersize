'use server';

export type ImageTag = {
  id: number;
  name: string;
  full_size: number;
};

export type FetchParams = {
  repository?: string;
  digest: string;
};


export async function getImageTags(image: string): Promise<ImageTag[]> {
  try {
    const res = await fetch(
      `https://hub.docker.com/v2/repositories/${image}/tags/`
    );
    const data = await res.json();
    return data.results as ImageTag[];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch image tags');
  }
}
