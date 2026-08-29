const API_BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

const api = {
  async fetchWithToken(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`
      }
    });
  },

  async register({ name, email, password }) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;
    return user;
  },

  async login({ email, password }) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { token } } = responseJson;
    return token;
  },

  async getOwnProfile() {
    const response = await this.fetchWithToken(`${API_BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { user } } = responseJson;
    return user;
  },

  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { users } } = responseJson;
    return users;
  },

  async createThread({ title, body, category = '' }) {
    const response = await this.fetchWithToken(`${API_BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, body, category })
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { thread } } = responseJson;
    return thread;
  },

  async getAllThreads() {
    const response = await fetch(`${API_BASE_URL}/threads`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { threads } } = responseJson;
    return threads;
  },

  async getDetailThread(id) {
    const response = await fetch(`${API_BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { detailThread } } = responseJson;
    return detailThread;
  },

  async createComment({ threadId, content }) {
    const response = await this.fetchWithToken(`${API_BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const { data: { comment } } = responseJson;
    return comment;
  },

  async upVoteThread(threadId) {
    const response = await this.fetchWithToken(`${API_BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') { throw new Error(message); }
    return responseJson.data.vote;
  },

  async downVoteThread(threadId) {
    const response = await this.fetchWithToken(`${API_BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') { throw new Error(message); }
    return responseJson.data.vote;
  },

  async neutralVoteThread(threadId) {
    const response = await this.fetchWithToken(`${API_BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') { throw new Error(message); }
    return responseJson.data.vote;
  },

  async upVoteComment(threadId, commentId) {
    const response = await this.fetchWithToken(`${API_BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') { throw new Error(message); }
    return responseJson.data.vote;
  },

  async downVoteComment(threadId, commentId) {
    const response = await this.fetchWithToken(`${API_BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') { throw new Error(message); }
    return responseJson.data.vote;
  },

  async neutralVoteComment(threadId, commentId) {
    const response = await this.fetchWithToken(`${API_BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST'
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') { throw new Error(message); }
    return responseJson.data.vote;
  },

  async getLeaderboards() {
    const response = await fetch(`${API_BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.leaderboards;
  }
};

export { getAccessToken, putAccessToken };
export default api;
