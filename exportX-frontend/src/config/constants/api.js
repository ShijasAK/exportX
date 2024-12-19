export const BASE_URL = import.meta.env.VITE_BASE_URL;

const API_CONSTANTS = {
  AUTH: {
    base: "/auth",
    login: "/auth/login",
    googleLogin: "/auth/google",
    logout: "/auth/logout",
    forgotPassword: "/send-forgot-password-mail",
    resetPassword: "/auth/reset-password",
  },
  CLIENTS: {
    base: "/clients",
    clientBrief: "/clients/:clientId/client-brief",
    socialMedia: "/clients/:clientId/social-media",
    brandKit: "/clients/:clientId/brand-kit",
    template: "/clients/:clientId/template",
    systemAccess: "/system-access",
    inviteUser: "/clients/invite/client-user",
  },
  ROLES: {
    base: "/roles",
  },
  USERS: {
    base: "/users",
    systemAccess: "/system-access",
  },
  PROJECTS: {
    base: "/projects",
    clientBase: "/client-dashboard/view-projects",
    projectOverview: "client-dashboard/projects/:projectId",
    overview: "/projects/:projectId/project-overview",
    clientLookup: "/projects/clients?name=:name",
    clientUserLookup: "/client-user/client/:clientId",
    projectUserLookup: "/projects/project-users",
    updateStatus: "/projects/:projectId/status-update",
  },
  DOCUMENT_TYPE: {
    list: "/projects/document-types/get-all",
    create: "/projects/document-types",
  },
  PROJECT_DOCUMENTS: {
    base: "/projects/:projectId/document-management",
    rename: "/projects/:projectId/documents/:documentId",
    delete: "/projects/:projectId/documents/:documentId",
    deleteIMG: "/projects/:projectId/document-management/:imageId",
  },
  PROJECT_USERS: {
    clientUsers: "/projects/:projectId/user-management/client-users",
    projectUsers: "/projects/project-users",
    updateProjectUsers:
      "/projects/:projectId/user-management/project-assignees",
    makeProjectManager:
      "/projects/:projectId/user-management/make-project-manager",
  },
  PROJECT_DISCUSSIONS: {
    base: "/projects/:projectId/discussion-forum",
    delete: "/projects/:projectId/discussion-forum/:discussionId",
  },
  AD_GOALS: {
    base: "/ad-goals",
  },
  CLIENT_USER: {
    base: "/client-user",
  },
  DESIGNATION: {
    base: "/user/designation",
    active: "/user/designation/active",
  },
  TOOLS: {
    base: "/tools",
    email: "/tools/email",
    saveEmail: "/tools/add/email",
    campaignIdea: "/tools/campaign-idea",
    savecampaignIdea: "/tools/add/campaign-idea",
    creativeIdea: "/tools/creative-idea",
    saveCreativeIdea: "/tools/add/creative-idea",
  },
  TONE_OF_VOICE: {
    base: "/tone-of-voices",
  },
  TASKS: {
    base: "/tasks/:projectId",
    statusUpdate: "/tasks/:projectId/:taskId/status",
    updateTask: "/tasks/:projectId/:taskId",
    bulkActions: "/tasks/:projectId/bulk-actions",
    sendApproval: "/tasks/:projectId/:taskId/send-for-approval",
  },
  CONTENT_PLANNER: {
    //imageid here is item id aka child of creative aka post in image form
    getSettings: "/projects/:projectId/settings",
    feedAiSettings: "/projects/:projectId/feed-ai",
    generateIdeas: "/projects/:projectId/content-ideas/get", //POST
    generate: "/projects/:projectId/content-ideas/generate", //GET
    generateMore: "/projects/:projectId/content-ideas/generate/more",
    regenerate: "/projects/:projectId/content-ideas/regenerate",
    saveIdea: "/projects/:projectId/content-ideas/save",
    getFinalData: "/projects/:projectId/content-planner",
    generateCreatives:
      "/projects/:projectId/content-planner/creatives/:creativeId/generate",
    generateImage:
      "/projects/:projectId/content-planner/creatives/:creativeId/:imageId/generated-images/generate",
    saveCreative:
      "/projects/:projectId/content-planner/creatives/:creativeId/save",
    getFilterData: "/projects/:projectId/get-filtered-items",
    clientGetFilterData:
      "/client-dashboard/:projectId/social-media-planner/filtered-items",
    updateStatus:
      "/projects/:projectId/content-planner/creatives/:creativeId/:imageId/status",
    clientUpdateStatus:
      "/client-dashboard/:projectId/social-media-planner/:creativeId/:imageId/status",
    bulkActions:
      "/projects/:projectId/content-planner/creatives/bulk-action?action=:action",
    clientBulkActions:
      "/client-dashboard/:projectId/social-media-planner/bulk-action?action=:action",
    schedule:
      "/projects/:projectId/content-planner/creatives/:creativeId/:imageId/schedule",
    editCreative: "/projects/content-planner/creatives/:creativeId/:imageId",
    getCreative: "/projects/content-planner/creatives/:creativeId/:imageId",
    getCreativeForEdit:
      "/projects/:projectId/content-planner/creatives/:planId/:itemId",
    deleteCreative:
      "/projects/:projectId/content-planner/creatives/:creativeId/:imageId",
    regenerateDallePrompt:
      "/projects/:projectId/content-planner/creatives/:creativeId/dalle-prompt/re-generate?aiTool=:tool&language=:language",
    regenerateImageIdeas:
      "/projects/:projectId/content-planner/creatives/:creativeId/image-ideas/re-generate?aiTool=:tool&language=:language",
    regenerateSinglePost:
      "/projects/:projectId/content-planner/creatives/:creativeId/:platform/regenerate?aiTool=:tool&language=:language",
    deleteGeneratedImage:
      "/projects/:projectId/content-planner/creatives/:creativeId/:imageId/generated-images/:generatedImageId",
    uploadImage:
      "/projects/:projectId/content-planner/creatives/:creativeId/:imageId/:postId/uploaded-images/upload",
    deleteUploadedImage:
      "/projects/:projectId/content-planner/creatives/:creativeId/:imageId/:postId/uploaded-images/:uploadedImageId",
  },
};

export default API_CONSTANTS;
