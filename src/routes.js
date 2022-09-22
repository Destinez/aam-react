import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import AddEmployees from "views/examples/employees/add-employee";
import EmployeeDetails from "views/examples/employees/employee-details";
import ManageEmployees from "views/examples/employees/manage-employees";
import GenerateInvitationLink from "views/examples/employees/invitation-link";
import Fields from "views/examples/fields/Fields";
import ForgotPassword from "views/examples/ForgotPassword";
import ResetPassword from "views/examples/ResetPassword";
import ChangePassword from "views/examples/ChangePassword";
import RegisterCustom from "views/examples/RegisterCustom";
import VerificationPending from "views/examples/VerificationPending";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/add-employees",
    name: "Add Employees",
    icon: "ni ni-pin-3 text-orange",
    component: AddEmployees,
    layout: "/admin"
  },
  {
    path: "/manage-employees",
    name: "Manage Employees",
    icon: "ni ni-pin-3 text-orange",
    component: ManageEmployees,
    layout: "/admin"
  },
  {
    path: "/employee-details",
    name: "Employee Details",
    icon: "ni ni-pin-3 text-orange",
    component: EmployeeDetails,
    layout: "/admin"
  },
  {
    path: "/verification-pending",
    name: "Verification Pending",
    icon: "ni ni-pin-3 text-orange",
    component: VerificationPending,
    layout: "/admin"
  },
  {
    path: "/invitation-link",
    name: "Generate Invitation Link",
    icon: "ni ni-single-02 text-yellow",
    component: GenerateInvitationLink,
    layout: "/admin"
  },
  {
    path: "/fields",
    name: "Fields",
    icon: "ni ni-single-02 text-yellow",
    component: Fields,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    icon: "ni ni-key-25 text-info",
    component: ForgotPassword,
    layout: "/auth"
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    icon: "ni ni-key-25 text-info",
    component: ResetPassword,
    layout: "/auth"
  },
  {
    path: "/change-password",
    name: "Change Password",
    icon: "ni ni-key-25 text-info",
    component: ChangePassword,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register/:token",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },
  {
    path: "/register-custom/:token",
    name: "RegisterCustom",
    icon: "ni ni-circle-08 text-pink",
    component: RegisterCustom,
    layout: "/auth"
  }
];
export default routes;
