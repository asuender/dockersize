import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

const base_hub_url = "https://hub.docker.com";

export async function GET(request: NextRequest, { params }: any) {
  const res = await fetch(
    `https://hub.docker.com/v2/repositories/${params.image[0]}/${params.image[1]}/`,
  );
  const data = await res.json();

  const is_official_image = data["namespace"] == "library";

  let response: NextResponse = NextResponse.json({
    is_official_image: is_official_image,
    hub_url: `${base_hub_url}/${is_official_image ? "_" : "r/" + params.image[0]}/${params.image[1]}`,
  });
  response.headers.set("Content-Type", "application/json");

  return response;
}
