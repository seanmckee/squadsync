import {
  authMiddleware,
  redirectToSignIn,
  redirectToSignUp,
} from "@clerk/nextjs";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    // if (!auth.userId && !auth.isPublicRoute) {
    //   if (req.url === "/onboarding") {
    //     return redirectToSignUp({ returnBackUrl: "/onboarding" });
    //   } else if (req.url === "/dashboard") {
    //     return redirectToSignIn({ returnBackUrl: "/dashboard" });
    //   }
    // }
  },
  publicRoutes: ["/", "/api/users"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
