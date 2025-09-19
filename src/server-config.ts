export const serverConfig = {
    cookieName: 'AuthToken',
    cookieSignatureKeys: ["Key-Should-Be-at-least-32-bytes-in-length"],

    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    apiKey: process.env.FIREBASE_API_KEY!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(
        /\\n/gm,
        "\n",
    ),
};
