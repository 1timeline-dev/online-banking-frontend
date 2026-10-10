import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { FaUserCircle, FaShieldAlt, FaKey, FaCamera, FaArrowLeft } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setUser(res.data.user);
    } catch (error) {
      toast.error("Unable to load profile.");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      return toast.error("Please choose an image.");
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setUploading(true);
      await api.post("/upload/profile-image", formData, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Profile picture updated!");
      fetchProfile();
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return <div className="flex h-screen items-center justify-center text-slate-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fbff_0%,_#eef4f8_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Profile</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">My account overview</h1>
          </div>
          <button onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100">
            <FaArrowLeft /> Back to dashboard
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-center">
            {user.profileImage ? <img src={user.profileImage} alt="Profile" className="mx-auto h-32 w-32 rounded-full border-4 border-emerald-500 object-cover" /> : <FaUserCircle size={120} className="mx-auto text-slate-400" />}
            <h2 className="mt-5 text-2xl font-semibold text-slate-900">{user.fullname}</h2>
            <p className="mt-2 break-all text-slate-500 sm:break-normal">{user.email}</p>

            <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-4">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                <FaCamera /> {image ? image.name : "Upload profile photo"}
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="hidden" />
              </label>
              <button onClick={handleUpload} disabled={uploading} className="mt-3 w-full rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70">
                {uploading ? "Uploading..." : "Save photo"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Account number</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{user.accountNumber}</h3>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">Current balance</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">₦{Number(user.balance).toLocaleString()}</h3>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-800 p-6 text-white">
              <div className="flex items-center gap-3">
                <FaShieldAlt className="text-emerald-300" />
                <h3 className="text-xl font-semibold">Security settings</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">Your account is protected with secure authentication and trusted access controls.</p>
              <button onClick={() => navigate("/change-password")} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium transition hover:bg-white/20">
                <FaKey /> Update password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;