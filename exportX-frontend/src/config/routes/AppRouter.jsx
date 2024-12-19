import React from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./error";
import Login from "../../pages/auth/Login";
import Signup from "../../pages/auth/Signup";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import Reset from "../../pages/auth/Reset";
import Verify from "../../pages/auth/Verify";
import AuthLayout from "../../components/layouts/AuthLayout";
import AdminLayout from "../../components/layouts/AdminLayout";
import Dashboard from "../../pages/client/Dashboard";
import Projects from "../../pages/client/Projects";
import Users from "../../pages/client/Users";
import Clients from "../../pages/client/Clients";
import ApproveWorkflow from "../../pages/client/ApproveWorkflow";
import AiPrompts from "../../pages/client/AiPrompts";
import Reports from "../../pages/client/Reports";
import Tools from "../../pages/client/Tools";
import SocialMediaPlanner from "../../pages/client/SocialMediaPlanner";
import ClientForm from "../../pages/client/Clients/ClientForm";
import CreativeIdeaGenerator from "../../pages/client/Tools/CreativeIdeaGenerator";
import GenerateCampaignIdeas from "../../pages/client/Tools/GenerateCampaignIdeas";
import ProjectDetails from "../../pages/client/Projects/ProjectDetails";
import GenerateEmailDraft from "../../pages/client/Tools/GenerateEmailDraft";
import PosterGenerator from "../../pages/client/Tools/PosterGenerator";
import SingleSocialMedia from "../../pages/client/Tools/SingleSocialMedia";
import SocialMediaForms from "../../pages/client/Projects/ProjectDetails/SocialMediaForms";
import History from "../../pages/client/SocialMediaPlanner/History";
import SocialMediaContentPlanner from "../../pages/client/SocialMediaPlanner/SocialMediaContentPlanner";
import Designations from "../../pages/client/Settings/Designations";
import Roles from "../../pages/client/Settings/Roles";
import AdGoals from "../../pages/client/Settings/AdGoals";
import ToneOfVoice from "../../pages/client/Settings/ToneOfVoice";
import ClientLayout from "../../components/layouts/ClientLayout";
import ClientDashboard from "../../pages/client/Dashboard/ClientDashboard";
import ClientProjects from "../../pages/client/Projects/ClientProjects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/auth/login"} replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={"/auth/login"} replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <Reset />,
      },
      {
        path: "verify",
        element: <Verify />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "clients/:id",
        element: <ClientForm />,
      },
      {
        path: "clients/new",
        element: <ClientForm />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },
      {
        path: "projects/:id/social-media-planner",
        element: <SocialMediaForms />,
      },
      {
        path: "projects/:id/social-media-planner/finalize",
        element: <SocialMediaContentPlanner />,
      },
      {
        path: "projects/:id/poster-generator",
        element: <PosterGenerator />,
      },
      {
        path: "tools",
        element: <Tools />,
      },
      {
        path: "approve-workflow",
        element: <ApproveWorkflow />,
      },
      {
        path: "ai-prompts",
        element: <AiPrompts />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "tools/single-social-media",
        element: <SingleSocialMedia />,
      },
      {
        path: "tools/generate-email-draft",
        element: <GenerateEmailDraft />,
      },
      {
        path: "tools/creative-idea-generator",
        element: <CreativeIdeaGenerator />,
      },
      {
        path: "tools/generate-campaign-ideas",
        element: <GenerateCampaignIdeas />,
      },
      {
        path: "tools/poster-generator",
        element: <PosterGenerator />,
      },
      {
        path: "social-media-planner",
        element: <SocialMediaPlanner />,
      },
      {
        path: "social-media-planner/new",
        element: <SocialMediaForms />,
      },
      {
        path: "social-media-planner/history",
        element: <History />,
      },
      {
        path: "social-media-planner/generate",
        element: <SocialMediaContentPlanner />,
      },
      {
        path: "settings",
        element: <Outlet to="/admin/settings/designations" replace />,
        children: [
          {
            index: true,
            element: <Navigate to="/admin/settings/designations" replace />,
          },
          {
            path: "designations",
            element: <Designations />,
          },
          {
            path: "roles",
            element: <Roles />,
          },
          {
            path: "ad-goals",
            element: <AdGoals />,
          },
          {
            path: "tone-of-voice",
            element: <ToneOfVoice />,
          },
        ],
      },
    ],
  },
  {
    path: "/client/dashboard",
    element: <ClientLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ClientDashboard />,
      },
      // TODO: add client prefix to all routes
      {
        path: "projects",
        element: <ClientProjects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },
      {
        path: "projects/:id/social-media-planner",
        element: <SocialMediaForms />,
      },
      {
        path: "projects/:id/social-media-planner/finalize",
        element: <SocialMediaContentPlanner />,
      },
      {
        path: "projects/:id/poster-generator",
        element: <PosterGenerator />,
      },
    ],
  },

  {
    path: "tools",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "creative-idea-generator",
        element: <CreativeIdeaGenerator />,
      },
      {
        path: "generate-campaign-ideas",
        element: <GenerateCampaignIdeas />,
      },
      {
        path: "generate-email-draft",
        element: <GenerateEmailDraft />,
      },
      {
        path: "poster-generator",
        element: <PosterGenerator />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
