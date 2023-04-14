import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { csrf } from "../tools/api";
import router from "../tools/router";
export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    incorrect_psd: null,
  });
  const [email, setEmail] = useState("");
  useEffect(() => {
    (async () => {
      await api
        .get("/api/user")
        .then((res) => {
          if (res.data.data.role === "admin") {
            router.navigate("/admin");
          }
        })
        .catch((er) => {});
    })();
  }, []);
  const [password, setPassword] = useState("");
  const LoginHandel = async (e) => {
    e.preventDefault();
    await csrf();
    await api
      .post("api/login", { email, password })
      .then((responce) => {
        if (responce.status) if (responce.status === 200) navigate("/admin");
      })
      .catch((er) => {
        if (er.response.status === 422) setErrors(er.response.data);
      });
  };

  return (
    <>
      <div className="container  h-full  ">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <h1 className="text-sky-800 ">Login</h1>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                    />
                    <span className="text-red-500 text-left text-sm mx-0 my-2">
                      {errors.email && errors.email[0]}
                    </span>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      autoComplete="current_password"
                    />
                    <span className="text-red-500 text-left text-sm mx-0 my-2">
                      {errors.password && errors.password[0]}
                      {errors.incorrect_psd && errors.incorrect_psd}
                    </span>
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-sky-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={LoginHandel}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
