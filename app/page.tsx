"use client";

import prettyBytes from "pretty-bytes";

import { useState } from "react";
import Loading from "./loading";

import { motion } from "framer-motion";
import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { log } from "console";

interface ImageInfo {
  is_official_image: boolean;
  hub_url: string;
}

const common_archs = ["amd64", "arm", "arm64"];

export default function Home() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<any[] | null>([]);
  const [info, setInfo] = useState<ImageInfo>({
    is_official_image: false,
    hub_url: "",
  });
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onlyCommonArchs, setOnlyCommonArchs] = useState(false);

  const checkArchsHandler = () => {
    setOnlyCommonArchs(!onlyCommonArchs);
  };

  async function getImages(event: any) {
    event.preventDefault();
    setLoading(true);
    setLoaded(false);

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

    let res = await fetch(`/api/images/tags/${repository}/${digest}`);
    let _tags = await res.json();

    res = await fetch(`/api/images/info/${repository}/${digest}`);
    let _info = await res.json();

    setTags(_tags?.results);
    setInfo(_info);
    setLoading(false);
    setLoaded(_tags?.results != null);
  }

  return (
    <main>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        }}
      >
        <h1 className="text-4xl lg:text-6xl">dockersize</h1>

        <p className="text-gray-500 dark:text-slate-400">
          A simple tool to get docker image sizes.
        </p>

        <form className="flex items-stretch mt-4 mb-1" onSubmit={getImages}>
          <input
            type="text"
            className="w-full h-max border-2 rounded-lg font-bold dark:text-slate-200 dark:placeholder:text-slate-300 dark:bg-slate-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. ubuntu, mysql..."
            autoFocus
            required
          />

          <button
            type="submit"
            className="border-solid border-2 rounded-lg border-slate-500 dark:bg-slate-600 ml-2 px-1"
          >
            <ArrowRightIcon className="w-9 h-full text-slate-500 dark:text-white" />
          </button>
        </form>

        {loaded && (
          <div className="flex justify-between py-3">
            {info?.is_official_image ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
                Official Image
              </span>
            ) : (
              <span />
            )}

            {info?.hub_url && (
              <a
                href={info?.hub_url}
                className="flex items-end text-blue-500 dark:text-blue-400 hover:underline"
                target="_blank"
              >
                View on Docker Hub
                <ArrowUpRightIcon className="w-6" />
              </a>
            )}
          </div>
        )}

        {loaded && (
          <div className="flex items-center pl-0.5">
            <input
              type="checkbox"
              name="only_common_archs"
              checked={onlyCommonArchs}
              onChange={checkArchsHandler}
              className="rounded-lg dark:bg-slate-300 mr-2"
            />
            <label htmlFor="only_common_archs" className="dark:text-slate-300">
              Show only common architectures
            </label>
          </div>
        )}

        <div className="output overflow-y-auto pl-1 pr-2">
          {loading ? (
            <Loading />
          ) : (
            tags?.map((tag) => (
              <DockerTag
                key={tag.id}
                tag={tag}
                onlyCommonArchs={onlyCommonArchs}
              />
            ))
          )}
        </div>
      </motion.div>
    </main>
  );
}

function DockerTag({ tag, onlyCommonArchs }: any) {
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

      {images
        ?.filter((image: any) => {
          return common_archs.includes(image.architecture) || !onlyCommonArchs;
        })
        .map((image: any) => (
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
