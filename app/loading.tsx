import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

import { useTheme } from "next-themes";

export default function Loading() {
  const { resolvedTheme, setTheme } = useTheme();
  const fullConfig = resolveConfig(tailwindConfig);

  return (
    <Skeleton
      count={7}
      baseColor={
        resolvedTheme == "dark"
          ? (fullConfig.theme?.colors?.slate as Record<string, string>)?.[500]
          : ""
      }
      highlightColor={
        resolvedTheme == "dark"
          ? (fullConfig.theme?.colors?.slate as Record<string, string>)?.[400]
          : ""
      }
    />
  );
}
