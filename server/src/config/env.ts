export const config = {
  port: process.env.PORT || 8000,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET as string,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET as string,
  geminiApiKey: process.env.GEMINI_API_KEY!,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
};