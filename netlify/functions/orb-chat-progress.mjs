import chat from './orb-chat.js';
import progress from './_shared/mika-progress.js';

export default (request, context) => progress.progressResponse(request, chat.handler, context);
export const config = { path: '/api/orb-chat-progress' };
