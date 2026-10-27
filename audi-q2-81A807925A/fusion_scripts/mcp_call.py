"""Call the local Fusion MCP server (streamable HTTP JSON-RPC) with a Fusion script file: python mcp_call.py script.py"""
import json, sys, urllib.request

URL = "http://127.0.0.1:27182/mcp"


def post(body, sid=None):
    h = {"Content-Type": "application/json", "Accept": "application/json, text/event-stream"}
    if sid:
        h["Mcp-Session-Id"] = sid
    req = urllib.request.Request(URL, data=json.dumps(body).encode(), headers=h, method="POST")
    with urllib.request.urlopen(req, timeout=900) as r:
        txt = r.read().decode("utf-8", "replace")
        return r.headers.get("Mcp-Session-Id"), txt


sid, _ = post({"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {
    "protocolVersion": "2025-03-26", "capabilities": {}, "clientInfo": {"name": "claude-cli", "version": "1"}}})
post({"jsonrpc": "2.0", "method": "notifications/initialized"}, sid)
script = open(sys.argv[1], encoding="utf-8").read()
_, out = post({"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {
    "name": "fusion_mcp_execute", "arguments": {"featureType": "script", "object": {"script": script}}}}, sid)
for line in out.splitlines():
    if line.startswith("data:"):
        line = line[5:]
    try:
        msg = json.loads(line)
    except Exception:
        continue
    for c in msg.get("result", {}).get("content", []):
        print(c.get("text", ""))
    if "error" in msg:
        print("ERROR", msg["error"])
