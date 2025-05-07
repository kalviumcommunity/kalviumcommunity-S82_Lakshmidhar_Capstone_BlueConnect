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
<<<<<<< HEAD
import PostJobForm from "./pages/PostJob";
import WorkerProfileForm from "./pages/Workerform";
import AppliedJobs from "./pages/RegisteredJobs";
import MyJobs from "./pages/MyJobs";
=======
import CreateJob from "./pages/CreateJob";
>>>>>>> 348ed8e51fc6b2275a5ab58d3af10769ecbe72f9

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
<<<<<<< HEAD
            <Route path="/post-job" element={<PostJobForm/>}/>
            <Route path="/dashboard/worker-profile" element={<WorkerProfileForm />} />
            <Route path="/applied-jobs" element={<AppliedJobs/>}/>
            <Route path="/my-jobs" element={<MyJobs/>} />
=======
            <Route path="/post-job" element={<CreateJob />} />

>>>>>>> 348ed8e51fc6b2275a5ab58d3af10769ecbe72f9
            <Route path="/jobs" element={<JobsList />} />
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
