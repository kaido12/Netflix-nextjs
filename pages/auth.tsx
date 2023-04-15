import { useCallback, useState } from "react";
import InputBox from "../components/InputBox";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { useRouter } from "next/router";




const Auth = () => {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alternate, setAlternate] = useState("signin");
  const toggle = useCallback(() => {
    setAlternate((current) => (current === "signin" ? "register" : "signin"));
  }, []);

  const signInHandler = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/" ,
      });

    router.push("/profiles")  
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const registerHandler = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      signInHandler();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, signInHandler]);

  return (
    <div className="absolute h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center">
      <div className="bg-black w-full h-full sm:bg-opacity-50">
        <nav className="px-8 py-5">
          <img src="./images/logo.png" className="h-10" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black/75 p-14 sm:w-3/5 sm:max-w-md mt-2 self-center rounded-md w-full">
            <h2 className="text-white text-3xl mb-4 font-semibold ">
              {alternate === "signin" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {alternate === "register" && (
                <InputBox
                  label="Username"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  type="name"
                  value={name}
                />
              )}

              <InputBox
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <InputBox
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={alternate === "signin" ? signInHandler : registerHandler}
              className="bg-red-600 py-2 text-white rounded-md w-full mt-4 hover:bg-red-700 transition"
            >
              {alternate === "signin" ? "Sign In" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-4 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
              <div
              onClick={() => signIn("facebook", { callbackUrl: "/" })}
              className="w-10 h-10 bg-white rounded-full text-blue-600 flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaFacebook size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-8">
              {alternate === "signin" ? "New to Netflix? " : "Already have an account? "}
              <span onClick={toggle} className="text-white text-lg ml-1 hover:underline cursor-pointer">
                {alternate === "signin" ? "Register" : "Sign In"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
