"use client";

import prettyBytes from "pretty-bytes";

import { useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<any[] | null>([]);
  const [loading, setLoading] = useState(false);

  async function getImages(event: any) {
    event.preventDefault();
    setLoading(true);

    let repository = "library",
      digest;

    if (/[a-z\d]{4,30}\/[a-zA-Z\d][a-zA-Z\d_.-]{0,254}/.test(input)) {
      repository = input.split("/")[0];
      digest = input.split("/")[1];
    } else if (/[a-zA-Z\d][a-zA-Z\d_.-]{0,254}/.test(input)) {
      digest = input;
    } else {
      setTags(null);
    }

    const res = await fetch(`/api/images/${repository}/${digest}`);
    const data = await res.json();

    setTags(data?.results);
    setLoading(false);
  }

  return (
    <main>
      <div>
        <h1 className="text-4xl lg:text-6xl dark:text-white">dockersize</h1>
      </div>

      <p className="text-gray-500 dark:text-slate-400">
        A simple tool to get docker image sizes.
      </p>

      <form className="mt-4 mb-1" onSubmit={getImages}>
        <input
          type="text"
          className="w-full rounded-md font-bold dark:text-slate-200 dark:placeholder:text-slate-300 dark:bg-slate-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. ubuntu, mysql..."
          autoFocus
          required
        />
      </form>

      <div className="output overflow-y-auto">
        {loading ? (
          <Loading />
        ) : (
          tags?.map((tag) => <DockerTag key={tag.id} tag={tag} />)
        )}
      </div>
    </main>
  );
}

function DockerTag({ tag }: any) {
  const { name, full_size, images } = tag || {};

  return (
    <div className="w-full py-2">
      <span className="font-bold dark:text-slate-300 dark:underline">
        {name}
      </span>

      <div className="flex flex-row justify-between text-xs uppercase">
        <span className="text-gray-500 dark:text-slate-400">os/arch</span>
        <span className="text-gray-500 dark:text-slate-400">
          compressed size
        </span>
      </div>

      {images?.map((image: any) => (
        <div
          key={image.digest}
          className="flex flex-row justify-between dark:text-slate-300"
        >
          <span>
            {image.os}/{image.architecture}
          </span>
          <span>
            {prettyBytes(image.size, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      ))}
    </div>
  );
}
