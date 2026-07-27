import { signIn } from "@/lib/admin/actions";

export const metadata = { title: "Log in" };

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const error = params?.error;
  const next = params?.next || "/admin";

  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-ink-200 bg-cream-50 p-8">
        <h1 className="font-display text-2xl text-ink-950">Vibesites Admin</h1>
        <p className="mt-1.5 text-sm text-ink-600">Sign in to manage leads.</p>

        {error && (
          <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            {error}
          </div>
        )}

        <form action={signIn} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="next" value={next} />
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-md border border-ink-300 bg-cream-50 px-3.5 py-2.5 text-sm text-ink-900 focus:border-teal-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-ink-300 bg-cream-50 px-3.5 py-2.5 text-sm text-ink-900 focus:border-teal-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-md bg-teal-600 px-4 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-teal-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
