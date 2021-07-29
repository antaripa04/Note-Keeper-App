import { lazy } from "react";

const LangingPage = lazy(() =>
  import("../components/pages/LandingPage/LandingPage.js")
);
const LoginScreen = lazy(() =>
  import("../components/pages/LoginScreen/LoginScreen.js")
);
const RegisterScreen = lazy(() =>
  import("../components/pages/RegisterScreen/RegisterScreen.js")
);
const MyNotes = lazy(() => import("../components/pages/MyNotes/MyNotes.js"));
const SingleNote = lazy(() =>
  import("../components/pages/SingleNote/SingleNote.js")
);
const CreateNote = lazy(() =>
  import("../components/pages/SingleNote/CreateNote.js")
);
const ProfileScreen = lazy(() =>
  import("../components/pages/ProfileScreen/ProfileScreen.js")
);

const routelist = [
  {
    path: "/",
    Component: LangingPage,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/register",
    Component: RegisterScreen,
  },
  {
    path: "/mynotes",
    Component: MyNotes,
  },
  {
    path: "/note/:id",
    Component: SingleNote,
  },
  {
    path: "/createnote",
    Component: CreateNote,
  },
  {
    path: "/profile",
    Component: ProfileScreen,
  },
  {
    path: "*",
    Component: () => (<><h3>404, Not found!</h3></>),
  },
];

export default routelist;
