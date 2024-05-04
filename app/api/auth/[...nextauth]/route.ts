// built based on https://docs.login.xyz/integrations/nextauth.js

import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
