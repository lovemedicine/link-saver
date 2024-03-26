import { Octokit } from 'octokit';
import { LinkMap } from './types';
import { encrypt, decrypt } from './crypto';
import { githubAccessToken, gistId, gistFilename, password } from '@src/config';

export async function saveRemoteLinkMap(linkMap: LinkMap): Promise<boolean> {
  const plaintext = JSON.stringify(linkMap);
  const ciphertext = await encrypt(password, plaintext);

  const octokit = new Octokit({
    auth: githubAccessToken,
  });

  await octokit.request(`PATCH /gists/${gistId}`, {
    files: {
      [gistFilename]: {
        content: ciphertext,
      },
    },
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  return true;
}

type GistData = {
  data: {
    files: {
      [name: string]: {
        content: string;
      };
    };
  };
};

export async function fetchRemoteLinkMap() {
  const octokit = new Octokit({
    auth: githubAccessToken,
  });

  const data: GistData = await octokit.request(`GET /gists/${gistId}`, {
    gist_id: gistId,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  const {
    data: {
      files: {
        [gistFilename]: { content },
      },
    },
  } = data;
  const json = await decrypt(password, content);

  return JSON.parse(json);
}
