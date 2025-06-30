// app/(auth)/unauthorized/page.tsx
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-6xl font-extrabold">401</h1>
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          Unauthorized
        </h2>
        <p className="mb-6 text-gray-600">
          Désolé, vous n&apos;êtes pas autorisé à accéder à cette page.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
