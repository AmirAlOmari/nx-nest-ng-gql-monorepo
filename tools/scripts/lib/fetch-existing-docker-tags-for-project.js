const axios = require('axios');

const {
  LINKEDOUT_GITLAB_REGISTRY_AUTH_TOKEN, // TODO: use it some day
  LINKEDOUT_GITLAB_USERNAME,
  LINKEDOUT_GITLAB_PASSWORD,
  LINKEDOUT_GITLAB_PROJECT = 'linkedout/linkedout',
} = process.env;

function toBase64(data) {
  return Buffer.from(data).toString('base64');
}

async function fetchNewGitLabRegistryToken() {
  const basicAuthPayload = `${LINKEDOUT_GITLAB_USERNAME}:${LINKEDOUT_GITLAB_PASSWORD}`;
  const basicAuthToken = toBase64(basicAuthPayload);

  const gitLabAuthUri = `https://gitlab.com/jwt/auth?service=container_registry&scope=repository:${LINKEDOUT_GITLAB_PROJECT}:pull`;

  const response = await axios.default.get(gitLabAuthUri, {
    headers: { Authorization: `Basic ${basicAuthToken}` },
  });

  if (response.status !== 200) {
    throw response;
  }

  const { token } = response.data;

  return { token };
}

async function fetchExistingDockerTagsForProject(project) {
  const { token } = await fetchNewGitLabRegistryToken();

  const gitLabProjectExistingTagsUri = `https://registry.gitlab.com/v2/${LINKEDOUT_GITLAB_PROJECT}/tags/list`;

  const response = await axios.default.get(gitLabProjectExistingTagsUri, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status !== 200) {
    throw response;
  }

  const { tags: allTags } = response.data;

  const projectTags = allTags.filter((tag) => tag.includes(project));
  const commitTags = projectTags.map((tag) => tag.replace(`-${project}`, ''));

  return { allTags, projectTags, commitTags };
}

module.exports = {
  fetchNewGitLabRegistryToken,
  fetchExistingDockerTagsForProject,
};
