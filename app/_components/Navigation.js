import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";
export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        {session?.user?.image ? (
          <li className="flex justify-start items-center space-x-2">
            <img
              className="rounded-full h-8"
              src={session?.user?.image}
              alt={session.user.name}
              referrerPolicy="no-referrer"
            />
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              {session ? session.user.name : "Guest area"}
            </Link>
          </li>
        ) : (
          <li>
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
