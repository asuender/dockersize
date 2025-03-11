'use server';

export type ImageTag = {
  id: number;
  name: string;
  full_size: number;
};

export type FetchParams = {
  digest?: string;
  image: string;
};


export async function getImageTags({
  digest = 'library',
  image,
}: FetchParams): Promise<ImageTag[]> {
  try {
    const res = await fetch(
      `https://hub.docker.com/v2/repositories/${digest}/${image}/tags/`
    );
    const data = await res.json();
    return data.results as ImageTag[];
  } catch (error) {
    throw new Error('Failed to fetch image tags');
  }
}
