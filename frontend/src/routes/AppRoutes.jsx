import Layout from "@/layouts/Layout";
import Home from "@/pages/home/Home";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/pages/authPages/Login";
import Register from "@/pages/authPages/Register";
import VerifyEmail from "@/pages/authPages/VerifyEmail";
import AuthLayout from "@/layouts/AuthLayout";
import ForgotPassword from "@/pages/authPages/ForgotPassword";
import ResetPassword from "@/pages/authPages/ResetPassword";
import Feature1 from "@/pages/features/Feature1";
import Feature2 from "@/pages/features/Feature2";
import Feature3 from "@/pages/features/Feature3";
import Feature4 from "@/pages/features/Feature4";
import Profile from "@/pages/Profile";
import PageNotFound from "@/pages/PageNotFound";
import DiscussionForum from "@/pages/discussion/DiscussionForum";
import Emergency from "@/pages/Emergency";
import Guidance from "@/pages/Guidance";
import SearchPage from "@/pages/search/SearchPage";
import ComLayout from "@/pages/community/ComLayout";
import Report from "@/pages/Report";
import FunFacts from "@/pages/FunFacts";
import GameBoard from "@/pages/games/GameBoard";
import MoodChatBot from "@/pages/MoodChat";
import Calendar from "@/pages/calendar/Calendar";
import OtherProfile from "@/components/OtherProfile";
import ChatLayout from "@/pages/personalChat/ChatLayout";
import Notice from "@/pages/Notice";
import MultiStepForm from "@/pages/MultiStepForm";
import CartPage from "@/pages/Cart";
import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Quiz from "@/pages/games/Quiz";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="f1" elaeme={<Feature1 />} />
          <Route path="f2" elaeme={<Feature2 />} />
          <Route path="f3" elaeme={<Feature3 />} />
          <Route path="f4" elaeme={<Feature4 />} />
          <Route path="profile" element={<Profile />} />
          <Route path="discussion" element={<DiscussionForum />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="community-chat" element={<ComLayout />} />
          <Route path="guidance" element={<Guidance />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="report" element={<Report />} />
          <Route path="fun-facts" element={<FunFacts />} />
          <Route path="games" element={<GameBoard />} />
          <Route path="chat" element={<MoodChatBot />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="/user/:userId" element={<OtherProfile />} />
          <Route path="/chat/:recipientId" element={<ChatLayout />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/form" element={<MultiStepForm />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/quiz" element={<Quiz />} />

        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
