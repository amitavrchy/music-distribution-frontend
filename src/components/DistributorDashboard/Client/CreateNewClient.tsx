import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateClientMutation } from "@/redux/features/distribution/distributionApi";

const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  role: z.string().min(1, "Please select a role"),
});

type ClientFormValues = z.infer<typeof clientSchema>;

const CreateNewClient = () => {
  const navigate = useNavigate();
  const [createClient, { isLoading }] = useCreateClientMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      role: "",
    },
  });

  const onSubmit = async (data: ClientFormValues) => {
    try {
      await createClient(data).unwrap();
      toast.success("Client created successfully!");
      navigate("/distributor-dashboard/client");
    } catch (error) {
      const apiError = error as { data?: { message?: string | string[] } };
      const errorMessage = Array.isArray(apiError.data?.message)
        ? apiError.data.message[0]
        : apiError.data?.message ||
          "Failed to create client. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className=" ">
      <MiniTitle
        title="Create New Client"
        subTitle="Enter or update the client's details below."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-white">
              Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              className={`border-none h-12 rounded-xl px-6 py-4 w-full bg-[#213430] text-white ${
                errors.name ? "ring-2 ring-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-white">
              E-mail Address
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={`border-none h-12 rounded-xl px-6 py-4 w-full bg-[#213430] text-white ${
                errors.email ? "ring-2 ring-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm text-white">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber")}
              className={`border-none h-12 rounded-xl px-6 py-4 w-full bg-[#213430] text-white ${
                errors.phoneNumber ? "ring-2 ring-red-500" : ""
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm text-white">
              Role
            </Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="bg-[#213430] h-12 text-white px-4 py-3 rounded-xl border-none w-full hover:bg-[#344b51] cursor-pointer">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 text-white border-none ">
                    <SelectGroup>
                      <SelectItem
                        value="Artist"
                        className="hover:bg-[#253638] cursor-pointer"
                      >
                        Artist
                      </SelectItem>
                      <SelectItem
                        value="Label"
                        className="hover:bg-[#253638] cursor-pointer"
                      >
                        Label
                      </SelectItem>
                      <SelectItem
                        value="Manager"
                        className="hover:bg-[#253638] cursor-pointer"
                      >
                        Manager
                      </SelectItem>
                      <SelectItem
                        value="Producer"
                        className="hover:bg-[#253638] cursor-pointer"
                      >
                        Producer
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role.message}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/distributor-dashboard/client")}
            className="px-6 py-3 bg-[#213430] text-white rounded-xl hover:bg-gray-500 transition-colors duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create Client"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewClient;
