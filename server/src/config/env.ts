export const config = {
  port: process.env.PORT || 8000,
  groqApiKey: process.env.GROQ_API_KEY!,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};