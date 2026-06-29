import { Outlet } from "react-router-dom";
import ProgressHeader from "../ProgressHeader";

export default function OnboardingLayout() {

  return (

    <div className="min-h-screen bg-[#F4EFE6]">

      <ProgressHeader />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <Outlet />

      </div>

    </div>

  );

}