import { IncomingHttpHeaders } from "http";
import { Stream } from "stream";

export async function stream2buffer(stream: Stream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const buffer = Array<Uint8Array>();
    stream.on("data", (chunk) => buffer.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(buffer)));
    stream.on("error", (err) => reject(`error converting stream - ${err}`));
  });
}

const headersToSkip = ["host", "cookie", "authorization"];

export function copyHeaders(reqHeaders: Headers): Headers;
export function copyHeaders(
  reqHeaders: IncomingHttpHeaders
): IncomingHttpHeaders;
export function copyHeaders(
  reqHeaders: IncomingHttpHeaders | Headers
): IncomingHttpHeaders | Headers {
  if (reqHeaders instanceof Headers) {
    const headers: Headers = new Headers();
    for (const [key, value] of reqHeaders.entries()) {
      if (!headersToSkip.includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    }
    return headers;
  }

  const headers: IncomingHttpHeaders = {};
  for (const headersKey in reqHeaders) {
    if (!headersToSkip.includes(headersKey.toLowerCase())) {
      headers[headersKey] = reqHeaders[headersKey];
    }
  }
  return headers;
}
