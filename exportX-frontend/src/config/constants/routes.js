const APP_ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  CLIENT: {
    DASHBOARD: "/client/dashboard",
    PROJECTS: "/client/dashboard/projects",
    PROJECTS_VIEW: "/client/dashboard/projects/:id",
    SOCIAL_MEDIA_PLANNER: "/client/dashboard/projects/:id/social-media-planner",
    SOCIAL_MEDIA_PLANNER_FINALIZE:
      "/client/dashboard/projects/:id/social-media-planner/finalize",
    POSTER_GENERATOR: "/client/dashboard/projects/:id/poster-generator",
  },
  ADMIN: {
    DASHBOARD: "/dashboard",
    PROJECTS: "/dashboard/projects",
    PROJECTS_VIEW: "/dashboard/projects/:id",
    SOCIAL_MEDIA_PLANNER: "/dashboard/projects/:id/social-media-planner",
    SOCIAL_MEDIA_PLANNER_FINALIZE:
      "/dashboard/projects/:id/social-media-planner/finalize",
    POSTER_GENERATOR: "/dashboard/projects/:id/poster-generator",
  },
};

export default APP_ROUTES;
