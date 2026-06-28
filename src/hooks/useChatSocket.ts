import { useEffect, useRef, useState } from "react";

type ChatSocketOptions = {
  conversationId: string | null;
  token: string | null;
  onConnected?: (data: any) => void;
  onMessage: (message: any) => void;
  onTyping?: (data: any) => void;
  onPresence?: (data: any) => void;
  onReadReceipt?: (data: any) => void;
  onErrorEvent?: (data: any) => void;
};

export function useChatSocket({
  conversationId,
  token,
  onConnected,
  onMessage,
  onTyping,
  onPresence,
  onReadReceipt,
  onErrorEvent,
}: ChatSocketOptions) {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!conversationId || !token) {
      setIsConnected(false);
      return;
    }

    let wsBaseUrl = process.env.NEXT_PUBLIC_WS_BASE_URL;
    if (!wsBaseUrl) {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8010";
      // Convert http/https protocols to ws/wss protocols
      wsBaseUrl = apiBase.replace(/^http/, "ws").replace(/\/$/, "");
    }

    const socketUrl = `${wsBaseUrl}/ws/chat/conversations/${conversationId}/?token=${token}`;
    console.log("Connecting to WebSocket:", socketUrl);
    
    const socket = new WebSocket(socketUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log("Chat WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "connection_established") {
          onConnected?.(data);
        }
        if (data.type === "message") {
          onMessage(data.message);
        }
        if (data.type === "typing") {
          onTyping?.(data);
        }
        if (data.type === "presence") {
          onPresence?.(data);
        }
        if (data.type === "read_receipt") {
          onReadReceipt?.(data);
        }
        if (data.type === "error") {
          onErrorEvent?.(data);
        }
      } catch (err) {
        console.error("Error parsing websocket message data", err);
      }
    };

    socket.onerror = (error) => {
      console.error("Chat WebSocket error", error);
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("Chat WebSocket disconnected");
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [conversationId, token]);

  function sendMessage(message: string) {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      return false;
    }
    socketRef.current.send(
      JSON.stringify({
        action: "send_message",
        message,
      })
    );
    return true;
  }

  function sendTyping(isTyping: boolean) {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      return;
    }
    socketRef.current.send(
      JSON.stringify({
        action: "typing",
        isTyping,
      })
    );
  }

  function markRead() {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      return;
    }
    socketRef.current.send(
      JSON.stringify({
        action: "mark_read",
      })
    );
  }

  return {
    isConnected,
    sendMessage,
    sendTyping,
    markRead,
  };
}
