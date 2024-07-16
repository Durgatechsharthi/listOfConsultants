import TextField from "@mui/material/TextField";
import { TbReload } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

const schema = z.object({
  captcha: z.string().min(2, { message: "This is required" }),
  confirm_password: z
    .string()
    .min(5, { message: "Password should contain at least 5 characters" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/, {
      message:
        "Password should contain letters, numbers, and special characters",
    }),
  password: z
    .string()
    .min(5, { message: "Password should contain at least 5 characters" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/, {
      message:
        "Password should contain letters, numbers, and special characters",
    }),
  user_address: z.string().min(2, { message: "Enter address" }),
  user_city: z.string().min(2, { message: "Enter a valid city" }),
  user_email: z
    .string()
    .min(2, { message: "Enter a valid email" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Enter a valid email",
    }),
  user_id: z
    .string()
    .min(2, { message: "User ID should not contain Special characters" }),
  user_id_proof_number: z.string().min(2, { message: "Enter ID Proof Number" }),
  user_mobile: z
    .string()
    .min(2, { message: "Enter a valid Mobile no" })
    .regex(/^\+?\d{10,15}$/, {
      message: "Enter a valid Mobile no",
    }),
  user_name: z.string().min(2, { message: "Enter a valid Name" }),
  user_pincode: z
    .string()
    .min(2, { message: "Enter a valid Pin Code" })
    .regex(/^\d{6}$/, {
      message: "Enter a valid Pin Code",
    }),
  user_state: z.string().min(2, { message: "Enter a valid State" }),
  user_type: z.string().min(2, { message: "Specify User type" }),
  user_ulb: z.string().min(2, { message: "This is required" }),
  user_qualification: z.string().min(2, { message: "Enter qualification" }),
  user_experience: z.string().min(2, { message: "Enter experience in years" }),
  user_coa_registration_number: z
    .string()
    .min(2, { message: "Enter COA registration number" }),
});

export default function ConsultantSignupForm() {
  const randomString = Math.random().toString(36).slice(8);
  const [captcha, setCaptcha] = useState(randomString);

  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(8));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), mode: "onTouched" });

  const uploadData = (data) => {
    console.log(data);
  };

  const [userType, setUserType] = useState("");

  const handleUserType = (event) => {
    setUserType(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(uploadData)} className="flex flex-col gap-3">
      <div className="flex justify-between bg-purple-500 text-white px-5 mt-2 py-2 rounded-sm">
        Personal Details
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextField
          error={errors.user_name ? true : false}
          helperText={errors.user_name && errors.user_name.message}
          id="user-name"
          label="Name *"
          variant="standard"
          className="w-full"
          {...register("user_name")}
          autoComplete="off"
        />
        <FormControl
          variant="standard"
          sx={{ minWidth: 175 }}
          error={errors.user_type ? true : false}
        >
          <InputLabel id="user-type-input">Select a division *</InputLabel>
          <Select
            {...register("user_type")}
            labelId="user-type-input"
            id="user-type"
            onChange={handleUserType}
            value={userType}
            label="Select Type of User *"
          >
            <MenuItem value={"Consultant"}>Consultant</MenuItem>
          </Select>
          <FormHelperText>
            {errors.user_type && errors.user_type.message}
          </FormHelperText>
        </FormControl>
        <TextField
          error={errors.user_id_proof_number ? true : false}
          helperText={
            errors.user_id_proof_number && errors.user_id_proof_number.message
          }
          id="user-id-proof-number"
          label="ID Proof Number *"
          variant="standard"
          className="w-full"
          {...register("user_id_proof_number")}
          autoComplete="off"
        />
        <TextField
          error={errors.user_qualification ? true : false}
          helperText={
            errors.user_qualification && errors.user_qualification.message
          }
          id="user-qualification"
          label="Select The Qualification *"
          variant="standard"
          className="w-full"
          {...register("user_qualification")}
          autoComplete="off"
        />
        <TextField
          error={errors.user_experience ? true : false}
          helperText={errors.user_experience && errors.user_experience.message}
          id="user-experience"
          label="Experience in Years *"
          variant="standard"
          className="w-full"
          {...register("user_experience")}
          autoComplete="off"
        />
        <TextField
          error={errors.user_coa_registration_number ? true : false}
          helperText={
            errors.user_coa_registration_number &&
            errors.user_coa_registration_number.message
          }
          id="user-coa-registration-number"
          label="COA Registration Number *"
          variant="standard"
          className="w-full"
          {...register("user_coa_registration_number")}
          autoComplete="off"
        />
      </div>

      <div className="flex justify-between bg-purple-500 text-white mt-2 px-5 py-2 rounded-sm">
        Contact Details
      </div>
      <div className="grid grid-cols-1 gap-4">
        <TextField
          error={errors.user_address ? true : false}
          helperText={errors.user_address && errors.user_address.message}
          id="user-address"
          label="Address *"
          variant="standard"
          className="w-full"
          {...register("user_address")}
          autoComplete="off"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <TextField
          error={errors.user_state ? true : false}
          helperText={errors.user_state && errors.user_state.message}
          id="user-state"
          label="State *"
          variant="standard"
          className="w-full"
          {...register("user_state")}
          autoComplete="off"
        />
        <TextField
          error={errors.user_city ? true : false}
          helperText={errors.user_city && errors.user_city.message}
          id="user-city"
          label="City *"
          variant="standard"
          className="w-full"
          {...register("user_city")}
          autoComplete="off"
        />
        <TextField
          error={errors.user_pincode ? true : false}
          helperText={errors.user_pincode && errors.user_pincode.message}
          id="user-pincode"
          label="Pin Code *"
          variant="standard"
          className="w-full"
          {...register("user_pincode")}
          autoComplete="off"
        />
        <TextField
          error={errors.user_mobile ? true : false}
          helperText={errors.user_mobile && errors.user_mobile.message}
          id="user-mobile"
          label="Mobile*"
          variant="standard"
          className="w-full"
          {...register("user_mobile")}
          autoComplete="off"
          inputProps={{ maxLength: 10 }}
        />
        <TextField
          error={errors.user_email ? true : false}
          helperText={errors.user_email && errors.user_email.message}
          id="user-email"
          label="Email *"
          variant="standard"
          className="w-full"
          {...register("user_email")}
          autoComplete="off"
        />
      </div>

      <div className="flex justify-between bg-purple-500 text-white mt-2 px-5 py-2 rounded-sm">
        Login Details
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TextField
          error={errors.user_id ? true : false}
          helperText={errors.user_id && errors.user_id.message}
          id="user-id"
          label="User Id *"
          variant="standard"
          className="w-full"
          {...register("user_id")}
          autoComplete="off"
        />
        <TextField
          error={errors.password ? true : false}
          helperText={errors.password && errors.password.message}
          id="user-password"
          label="Password *"
          variant="standard"
          className="w-full"
          {...register("password")}
          autoComplete="off"
        />
        <TextField
          error={errors.confirm_password ? true : false}
          helperText={
            errors.confirm_password && errors.confirm_password.message
          }
          id="user-confirm-password"
          label="Confirm Password *"
          variant="standard"
          className="w-full"
          {...register("confirm_password")}
          autoComplete="off"
        />
      </div>
      <TextField
        error={errors.user_ulb ? true : false}
        helperText={errors.user_ulb && errors.user_ulb.message}
        id="user-ulb"
        label="Type to search ULB *"
        variant="standard"
        className="w-full"
        {...register("user_ulb")}
        autoComplete="off"
      />
      <div className="flex flex-row gap-2">
        <TextField
          error={errors.captcha ? true : false}
          helperText={errors.captcha && errors.captcha.message}
          autoComplete="off"
          {...register("captcha")}
          id="captcha"
          label="Enter Captcha *"
          variant="standard"
          className="w-1/2 md:w-1/5"
        />
        <div className="flex items-center w-1/2 gap-2 ">
          <button
            onClick={(e) => {
              refreshString();
              e.preventDefault();
            }}
            className="order-1 md:order-1"
          >
            <TbReload className="text-[#0288d1] text-xl" />
          </button>
          <div className="border-2 border-blue-500 w-full h-10 text-center pt-1 text-lg font-semibold order-1 md:order-2 md:w-2/6">
            {captcha}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-base text-xs text-white w-3/4 md:text-[16px] md:w-[34%] py-2 rounded-md mt-3 mb-3 hover:bg-slate-500 hover:duration-700"
        >
          CLICK TO UPLOAD DOCUMENTS
        </button>
      </div>
    </form>
  );
}
