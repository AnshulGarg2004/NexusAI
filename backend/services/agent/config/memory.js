import redis from "../../../shared/redis/redis.js"
import { getMessage } from "../utils/getMessage.js";

const normalizeMessages = (value) => {
    if (Array.isArray(value)) {
        return value;
    }

    if (value && Array.isArray(value.messages)) {
        return value.messages;
    }

    return [];
};

export const getMemory = async (conversationId) => {
    const key = `messages-${conversationId}`;
    const cachedMessages = await redis.get(key);

    if (cachedMessages) {
        return normalizeMessages(JSON.parse(cachedMessages));
    }
    const messages = await getMessage(conversationId);
    const normalizedMessages = normalizeMessages(messages);
    await redis.set(key, JSON.stringify(normalizedMessages), "EX", 24 * 60 * 60);

    return normalizedMessages;

}

export const addMessages = async (conversationId, role, content) => {
    const key = `messages-${conversationId}`;

    const rawMess = await redis.get(key);

    const messages = rawMess ? normalizeMessages(JSON.parse(rawMess)) : [];

    messages.push({ role, content });

    if (messages.length > 20) {
        messages.shift();
    }

    await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60); 
}
