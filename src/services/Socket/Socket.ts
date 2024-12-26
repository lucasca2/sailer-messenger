export class Socket {
  private baseUrl = process.env.NEXT_PUBLIC_WS_URL;

  public client?: WebSocket;

  private eventListeners: Record<string, (data: any) => void> = {};

  public connect(url: string) {
    this.client = new WebSocket(`${this.baseUrl}${url}`);

    this.client.onopen = () => {
      console.log("WebSocket connection established");
    };

    this.client.onclose = () => {
      console.log("WebSocket connection closed");
      this.client = undefined;
    };

    this.client.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.client.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (this.eventListeners[data.event]) {
        this.eventListeners[data.event](data.data);
      }
    };
  }

  public on(event: string, callback: (data: any) => void) {
    this.eventListeners[event] = callback;
  }

  public disconnect() {
    if (this.client) {
      this.client.close();
      this.client = undefined;
    }
  }

  get isConnected() {
    return this.client?.readyState === WebSocket.OPEN;
  }
}
