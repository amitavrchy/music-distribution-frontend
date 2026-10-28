import { useState, ChangeEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfileInformation = () => {
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="w-full p-8 bg-[#0D1D22] rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Personal Information</h1>

        <div className="flex items-center space-x-4 mb-8">
          <Avatar className="w-20 h-20 rounded-full bg-[#D9D9D9]">
            {avatar ? (
              <AvatarImage src={avatar} alt="Profile" />
            ) : (
              <AvatarFallback>JD</AvatarFallback>
            )}
          </Avatar>

          <div className="space-y-2">
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Upload Button */}
            <label
              htmlFor="avatar-upload"
              className="flex items-center gap-2 h-10 px-3 rounded-[15px] text-sm bg-[#01D449] text-white font-sans hover:bg-[#019f3b] cursor-pointer"
            >
              Upload Photo
            </label>
            <p className="text-[#BDBDBD] font-sans">JPG, PNG max 5MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm text-white">
              First Name
            </Label>
            <Input
              id="firstName"
              className="border border-[#B3B3B3] rounded-xl px-6 py-6 w-full bg-[#253438]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-gray-600">
              E-mail Address
            </Label>
            <Input
              id="email"
              type="email"
              className="border border-[#B3B3B3] rounded-xl px-6 py-6 w-full bg-[#253438]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-gray-600">
              Phone Number
            </Label>
            <Input
              id="phone"
              className="border border-[#B3B3B3] rounded-xl px-6 py-6 w-full bg-[#253438]"
            />
          </div>
        </div>

        <button className=" text-lg flex justify-center items-center gap-[10px] w-full sm:w-[206px] h-[52px] px-4 py-[10px] rounded-[12px] bg-[#3A5CFF] text-white hover:bg-blue-500 cursor-pointer mt-4 flex-shrink-0">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileInformation;

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const ProfileInformation = () => {
//   return (
//     <div>
//       <div className="w-full p-8 bg-[#0D1D22] rounded-xl shadow-md">
//         <h1 className="text-2xl font-semibold mb-6">Personal Information</h1>
//         <div className="flex items-center space-x-4 mb-8">
//           <Avatar className="w-20 h-20 rounded-full bg-[#D9D9D9]">
//             <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
//             <AvatarFallback>JD</AvatarFallback>
//           </Avatar>
//           <div className="space-y-2">
//             <button className="flex items-center gap-2 h-10 px-3 rounded-[15px] text-sm bg-[#01D449] text-white font-sans hover:bg-[#019f3b]">
//               Upload Photo
//             </button>
//             <p className="text-[#BDBDBD] font-sans">JPG, PNG max 5MB</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <Label htmlFor="firstName" className="text-sm text-white">
//               First Name
//             </Label>
//             <Input
//               id="firstName"
//               className="border border-[#B3B3B3] rounded-xl px-6 py-6 w-full bg-[#253438]"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="email" className="text-sm text-gray-600">
//               E-mail Address
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               className="border border-[#B3B3B3] rounded-xl px-6 py-6 w-full bg-[#253438]"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="phone" className="text-sm text-gray-600">
//               Phone Number
//             </Label>
//             <Input
//               id="phone"
//               className="border border-[#B3B3B3] rounded-xl px-6 py-6 w-full bg-[#253438]"
//             />
//           </div>
//         </div>
//         <button className="w-full py-2 mt-4 bg-blue-600 rounded-md text-white hover:bg-blue-500 cursor-pointer">
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileInformation;
