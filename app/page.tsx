'use client';

import { useState } from 'react';
import { ImageTag, getImageTags } from '@/app/lib/actions';
import DockerTag from '@/app/components/DockerTag';
import SubmitButton from '@/app/components/SubmitButton';

const CUSTOM_REPO_REGEX = /[a-z\d]{4,30}\/[a-zA-Z\d][a-zA-Z\d_.-]{0,254}/;

export default function Home() {
  const [data, setData] = useState<ImageTag[] | null>(null);

  function usesCustomRepo(imageName: string) {
    return CUSTOM_REPO_REGEX.test(imageName);
  }

  async function handleFormSubmit(formData: FormData) {
    const userInput = formData.get('image-name') as string;
    const imageName = usesCustomRepo(userInput) ? userInput : `library/${userInput}`;

    try {
      const tags = await getImageTags(imageName);
      setData(tags || []);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-3 w-md">
        <div>
          <h1 className="text-4xl font-bold">dockersize</h1>
          <p className="text-gray-400">
            A simple tool to get docker image sizes
          </p>
        </div>
        <form action={handleFormSubmit} className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-2 py-1.5 rounded-md border-1 border-gray-400"
            placeholder="Enter docker image name"
            name="image-name"
            aria-label="image-name"
            required
          />
          <SubmitButton />
        </form>

        {data?.length ? (
          <div className="max-h-[300px] overflow-y-auto">
            <div className="flex justify-between">
              <span className="font-bold">Tag</span>
              <span className="font-bold">Size</span>
            </div>
            {data.map((tag: ImageTag) => (
              <DockerTag key={tag.id} {...tag} />
            ))}
          </div>
        ) : (
          data != null && <p>No images found.</p>
        )}
      </div>
    </main>
  );
}
