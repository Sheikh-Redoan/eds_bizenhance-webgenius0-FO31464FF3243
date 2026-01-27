import { useState } from 'react';
import { useUpdateProfileMutation } from '../../redux/api/userApi';
import Button from '../../components/ui/Button';
import { X, Camera } from 'lucide-react';

const EditProfileModal = ({ user, onClose }) => {
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user?.avatar);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      await updateProfile(formData).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#FFF1E0] w-full max-w-md rounded-xl shadow-2xl overflow-hidden border-4 border-[#5d4037] relative">
        <button onClick={onClose} className="absolute top-2 right-2 p-2 text-[#5d4037] hover:bg-[#5d4037]/10 rounded-full z-10">
          <X size={24} />
        </button>
        
        <div className="bg-[#3F291B] p-6 text-center">
          <h2 className="text-2xl font-OldLondon text-[#D4B483]">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer">
              <img 
                src={preview || "https://via.placeholder.com/150"} 
                alt="Profile Preview" 
                className="w-24 h-24 rounded-full object-cover border-4 border-[#8B7355] shadow-lg"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="text-white w-8 h-8" />
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            <p className="text-xs text-[#5D4037]/70 font-Merriweather">Click to change photo</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#3F291B] font-Merriweather font-bold text-sm">Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 bg-white/50 border-2 border-[#8B7355]/30 rounded-lg focus:border-[#8B7355] focus:outline-none font-Merriweather text-[#3F291B]"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 bg-transparent text-[#5d4037] border border-[#5d4037] hover:bg-[#5d4037]/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="px-6 py-2 text-white bg-[#5d4037] hover:bg-[#3F291B]"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
