import Modal from "@/components/core/Modal";

export default function Register() {
  return (
    <Modal>
      <div className="p-5">
        <h3 className="text-2xl mb-0.5 font-medium"></h3>
        <p className="mb-4 text-sm font-normal text-gray-800"></p>

        <div className="text-center">
          <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
            Daftar
          </p>
          <p className="mt-2 text-sm leading-4 text-slate-600">
            Silakan mendaftar di website kami.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-2">
          <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-[18px] w-[18px] "
            />
            Daftar dengan Google
          </button>
        </div>

        <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
          <div className="h-px w-full bg-slate-200"></div>
          ATAU
          <div className="h-px w-full bg-slate-200"></div>
        </div>

        <form className="w-full">
          <label htmlFor="email" className="sr-only">
            Username
          </label>
          <input
            name="username"
            type="text"
            required
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="Masukkan Username"
          />
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="Masukkan Email"
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
            placeholder="Masukkan Password"
          />
          {/* <p className="mb-3 mt-2 text-sm text-gray-500">
            <a
              href="/forgot-password"
              className="text-blue-800 hover:text-blue-600"
            >
              Reset your password?
            </a>
          </p> */}
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
          >
            Continue
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          {/* Don't have an account? */}
          {/* <a href="/signup" className="font-medium text-[#4285f4]">
            Sign up
          </a> */}
        </div>
      </div>
    </Modal>
  );
}
