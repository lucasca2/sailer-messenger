class ApiClass {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  public post(
    url: string,
    init?: Omit<RequestInit, "body" | "method"> & {
      body?: Record<string, any>;
      params?: Record<string, any>;
    }
  ) {
    return this.fetch(url, { ...init, method: "POST" });
  }

  public put(
    url: string,
    init?: Omit<RequestInit, "body" | "method"> & {
      body?: Record<string, any>;
      params?: Record<string, any>;
    }
  ) {
    return this.fetch(url, { ...init, method: "PUT" });
  }

  public get(
    url: string,
    init?: Omit<RequestInit, "body" | "method"> & {
      params?: Record<string, any>;
    }
  ) {
    const hasParams = !!init?.params;

    if (hasParams) {
      const queryString = new URLSearchParams(init.params).toString();
      url = `${url}?${queryString}`;
    }

    return this.fetch(url, { ...init, method: "GET" });
  }

  private async fetch(
    url: string,
    init?: Omit<RequestInit, "body"> & {
      body?: Record<string, any>;
      params?: Record<string, any>;
    }
  ) {
    const requestUrl = `${this.baseUrl}${url}`;

    const response = await fetch(requestUrl, {
      ...init,
      body: JSON.stringify(init?.body),
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    } as RequestInit);

    if (response.ok) {
      return await response.json();
    }

    throw await response.json();
  }
}

export const Api = new ApiClass();
