import type { IncomingMessage, ServerResponse } from 'node:http';

export function profileStatsMiddleware(req: IncomingMessage, res: ServerResponse, next: () => void): Promise<void>;
export default function handler(request: Request): Promise<Response>;
