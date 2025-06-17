import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JobsList from "./pages/JobsList";
import WorkersList from "./pages/WorkersList";
import JobDetails from "./pages/JobDetails";
import WorkerDetails from "./pages/WrokerDetails";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import PostJobForm from "./pages/PostJob";
import WorkerProfileForm from "./pages/Workerform";
import AppliedJobs from "./pages/RegisteredJobs";
import MyJobs from "./pages/MyJobs";
import DonateMoney from "./components/payment/Donatemoney";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/post-job" element={<PostJobForm/>}/>
            <Route path="/create-worker-profile" element={<WorkerProfileForm />} />
            <Route path="/applied-jobs" element={<AppliedJobs/>}/>
            <Route path="/my-jobs" element={<MyJobs/>} />
            <Route path="/donate" element={<DonateMoney />} />
            <Route path="/find-jobs" element={<JobsList />} />
            <Route path="/jobs/edit/:jobId" element={<PostJobForm />} />
            <Route path="/workers" element={<WorkersList />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/workers/:id" element={<WorkerDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
