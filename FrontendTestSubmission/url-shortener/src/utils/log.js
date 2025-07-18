import { getAuthToken } from './auth';

let cachedToken = null;

export async function Log(stack, level, packageName, message) {
  try {
    if (!cachedToken) {
      cachedToken = await getAuthToken();
    }

    const logPayload = {
      stack,
      level,
      package: packageName,
      message,
      timestamp: new Date().toISOString()
    };

    await fetch("http://20.244.56.144/evaluation-service/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cachedToken}`
      },
      body: JSON.stringify(logPayload)
    });
  } catch (error) {
    console.error("Logging failed:", error);
  }
}