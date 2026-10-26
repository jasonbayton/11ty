// Request-local Responses state. Replay provider output verbatim so reasoning
// and phase metadata survive the handler's established tool loop.
function createResponsesCompletion(client) {
  const input = [];
  let consumed = 0;
  return async options => {
    for (const message of options.messages.slice(consumed)) {
      if (consumed && message.role === 'assistant') continue;
      if (message.role === 'tool') input.push({ type: 'function_call_output', call_id: message.tool_call_id, output: message.content });
      else input.push({ role: message.role, content: message.content });
    }
    consumed = options.messages.length;
    const raw = await client.responses.create({
      model: options.model, input, store: false,
      reasoning: { effort: options.reasoning_effort },
      max_output_tokens: options.max_completion_tokens,
      tools: options.tools.map(tool => ({ type: tool.type, ...tool.function, strict: false })),
      tool_choice: options.tool_choice, parallel_tool_calls: options.parallel_tool_calls,
      include: ['reasoning.encrypted_content'],
    });
    if (raw.status === 'failed') throw new Error('OpenAI response generation failed');
    // Never execute partial tools or present a preamble as a finished answer.
    const output = raw.status === 'completed' ? raw.output || [] : [];
    input.push(...output);
    const calls = output.filter(item => item.type === 'function_call');
    const content = output.filter(item => item.type === 'message' && item.phase !== 'commentary')
      .flatMap(item => item.content || [])
      .map(item => item.type === 'output_text' ? item.text : item.type === 'refusal' ? item.refusal : '').join('');
    return { choices: [{
      finish_reason: raw.status === 'incomplete' ? 'length' : calls.length ? 'tool_calls' : 'stop',
      message: { role: 'assistant', content: content || null,
        ...(calls.length ? { tool_calls: calls.map(call => ({ id: call.call_id, type: 'function', function: { name: call.name, arguments: call.arguments } })) } : {}),
      },
    }] };
  };
}

module.exports = { createResponsesCompletion };
