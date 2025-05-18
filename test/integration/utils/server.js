import { Server } from "../../../server.js"

export function buildTestServer(app) {
  const server = new Server(app)
  return server
}