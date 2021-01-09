import { useForm } from "react-hook-form";
import { useAuth } from "src/lib/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout/index";

const Login = () => {
  const { handleSubmit, register } = useForm();
  const { loginWithEmailAndPassword } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    await loginWithEmailAndPassword(data.email, data.password);
    router.push("/");
  };

  return (
    <Layout>
      <div className="flex items-center content-center w-full min-h-screen px-4 text-black bg-gray-800">
        <form
          className="w-full max-w-3xl px-4 py-8 m-auto mx-auto bg-white rounded shadow-md "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-extrabold text-center ">Login</h1>
          <div className="px-4 pb-4">
            <label htmlFor="email" className="block pb-2 text-sm font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              ref={register}
              className="w-full px-3 py-2 leading-tight text-gray-700 border border-blue-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline "
              placeholder="JohnDoe@example.com"
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="password" className="block pb-2 text-sm font-bold">
              Senha
            </label>
            <input
              type="password"
              name="password"
              ref={register}
              className="w-full px-3 py-2 leading-tight text-gray-700 border border-blue-300 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              className="inline px-4 py-2 mx-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <Link href="/register">
              <a href="/register" className="text-blue-400">
                Cadastre-se
              </a>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
