"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_EMAIL = "selmenselmi5@gmail.com";
const ADMIN_USER_ID = "05a84b26-e666-48d2-aa9d-8d17f8d66163";

function formatDate(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function isSameDay(date, comparison) {
  return (
    date.getFullYear() === comparison.getFullYear() &&
    date.getMonth() === comparison.getMonth() &&
    date.getDate() === comparison.getDate()
  );
}

function isAdminSession(session) {
  return session?.user?.id === ADMIN_USER_ID;
}

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStatus, setAuthStatus] = useState("checking");
  const [credentials, setCredentials] = useState({
    email: ADMIN_EMAIL,
    password: "",
  });
  const [adminUser, setAdminUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      setAdminUser(session?.user ?? null);
      setIsAuthenticated(isAdminSession(session));
      setAuthStatus("ready");
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminUser(session?.user ?? null);
      setIsAuthenticated(isAdminSession(session));
      setAuthStatus("ready");
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    async function loadContacts() {
      setStatus("loading");
      setError("");

      const { data, error: contactsError } = await supabase
        .from("contacts")
        .select("id,name,email,phone,inquiry_subject,message,created_at")
        .order("created_at", { ascending: false });

      if (contactsError) {
        console.error("Failed to load contacts:", contactsError);
        setError(contactsError.message);
        setStatus("error");
        return;
      }

      setContacts(data ?? []);
      setStatus("success");
    }

    loadContacts();
  }, [isAuthenticated]);

  const stats = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const todayCount = contacts.filter((contact) =>
      contact.created_at ? isSameDay(new Date(contact.created_at), now) : false,
    ).length;

    const weekCount = contacts.filter((contact) =>
      contact.created_at ? new Date(contact.created_at) >= sevenDaysAgo : false,
    ).length;

    const uniqueEmails = new Set(
      contacts.map((contact) => contact.email?.toLowerCase()).filter(Boolean),
    ).size;

    return [
      { label: "Total inquiries", value: contacts.length },
      { label: "Today", value: todayCount },
      { label: "Last 7 days", value: weekCount },
      { label: "Unique emails", value: uniqueEmails },
    ];
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return contacts;

    return contacts.filter((contact) =>
      [
        contact.name,
        contact.email,
        contact.phone,
        contact.inquiry_subject,
        contact.message,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [contacts, search]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError("");
    setAuthStatus("logging-in");

    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      {
        email: credentials.email,
        password: credentials.password,
      },
    );

    if (signInError) {
      setLoginError(signInError.message);
      setAuthStatus("ready");
      return;
    }

    if (!isAdminSession(data.session)) {
      await supabase.auth.signOut();
      setLoginError("This account is not allowed to access the dashboard.");
      setAuthStatus("ready");
      return;
    }

    setAdminUser(data.session?.user ?? null);
    setIsAuthenticated(true);
    setAuthStatus("ready");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setAdminUser(null);
    setIsAuthenticated(false);
    setCredentials({ email: ADMIN_EMAIL, password: "" });
    setContacts([]);
  }

  if (authStatus === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#120d08] px-5 text-[#fff8ea]">
        <p className="rounded-2xl border border-white/10 bg-white/[0.07] px-6 py-4 text-white/65 backdrop-blur-2xl">
          Checking admin session...
        </p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#120d08] px-5 py-16 text-[#fff8ea]">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(244,207,123,.16),transparent_30%),linear-gradient(180deg,#120d08,#080604)]" />
        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center">
          <form
            onSubmit={handleLogin}
            className="w-full rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-[0_0_80px_rgba(244,207,123,.10)] backdrop-blur-2xl md:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.36em] text-amber-200/80">
              Admin access
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em]">
              Dejla Dashboard
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Sign in with the Supabase admin account to view contact inquiries.
            </p>

            <label className="mt-8 block">
              <span className="text-sm font-semibold text-white/70">Email</span>
              <input
                value={credentials.email}
                onChange={(event) =>
                  setCredentials((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                type="email"
                autoComplete="email"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition focus:border-amber-200/70"
                placeholder={ADMIN_EMAIL}
              />
            </label>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-white/70">
                Password
              </span>
              <input
                value={credentials.password}
                onChange={(event) =>
                  setCredentials((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition focus:border-amber-200/70"
                placeholder="Your Supabase user password"
              />
            </label>

            {loginError && (
              <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 p-3 text-sm font-semibold text-red-200">
                {loginError}
              </p>
            )}

            <button
              disabled={authStatus === "logging-in"}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-amber-200 via-[#f4cf7b] to-amber-500 px-8 py-4 font-black uppercase tracking-[0.22em] text-[#120d08] shadow-[0_18px_55px_rgba(244,207,123,.20)] transition hover:shadow-[0_24px_75px_rgba(244,207,123,.32)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {authStatus === "logging-in" ? "Signing in..." : "Login"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#120d08] px-5 py-10 text-[#fff8ea] md:px-10">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(244,207,123,.14),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(234,184,92,.08),transparent_28%),linear-gradient(180deg,#120d08,#080604)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.42em] text-amber-200/80">
              Admin dashboard
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.07em] md:text-7xl">
              Contact Inquiries
            </h1>
            <p className="mt-4 max-w-2xl text-white/58">
              View submissions sent from the Dejla Estates contact form.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white/70 transition hover:border-amber-200/50 hover:text-amber-100"
          >
            Logout
          </button>
        </header>

        <section className="mt-8 rounded-[1.5rem] border border-amber-200/20 bg-amber-200/[0.06] p-4 text-sm text-amber-50/80 backdrop-blur-2xl">
          <p className="font-semibold text-amber-100">Supabase session debug</p>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            <p>
              Signed in as:{" "}
              <span className="text-white">{adminUser?.email ?? "—"}</span>
            </p>
            <p>
              User UID:{" "}
              <span className="break-all text-white">
                {adminUser?.id ?? "—"}
              </span>
            </p>
            <p>
              Expected admin UID:{" "}
              <span className="break-all text-white">{ADMIN_USER_ID}</span>
            </p>
            <p>
              Load status: <span className="text-white">{status}</span>
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-[0_0_45px_rgba(244,207,123,.08)] backdrop-blur-2xl"
            >
              <p className="text-sm font-semibold text-white/50">
                {item.label}
              </p>
              <p className="mt-3 text-4xl font-black tracking-[-0.05em] text-amber-100">
                {item.value}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-2xl md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">
                Latest messages
              </h2>
              <p className="mt-1 text-sm text-white/50">
                {filteredContacts.length} of {contacts.length} inquiries shown
              </p>
            </div>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search contacts..."
              className="w-full rounded-2xl border border-white/10 bg-black/25 px-5 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-amber-200/70 md:max-w-sm"
            />
          </div>

          {status === "loading" && (
            <p className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 text-white/60">
              Loading contacts...
            </p>
          )}

          {status === "error" && (
            <p className="mt-8 rounded-2xl border border-red-300/20 bg-red-500/10 p-5 text-red-100">
              Could not load contacts: {error}
            </p>
          )}

          {status === "success" && filteredContacts.length === 0 && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 text-white/60">
              <p>No visible contact inquiries found.</p>
              <p className="mt-3 text-sm leading-6 text-white/45">
                If you already submitted the public form, run the Supabase SQL
                checker file and make sure the admin read policy is installed.
                If the checker shows 0 total rows, the contact form has not
                inserted any rows yet.
              </p>
            </div>
          )}

          {filteredContacts.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[980px] border-separate border-spacing-y-3 text-left">
                <thead className="text-xs uppercase tracking-[0.18em] text-white/40">
                  <tr>
                    <th className="px-4 py-2">Contact</th>
                    <th className="px-4 py-2">Phone</th>
                    <th className="px-4 py-2">Subject</th>
                    <th className="px-4 py-2">Message</th>
                    <th className="px-4 py-2">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="bg-white/[0.055] align-top">
                      <td className="rounded-l-2xl px-4 py-4">
                        <p className="font-semibold text-amber-100">
                          {contact.name}
                        </p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="mt-1 block text-sm text-white/50 transition hover:text-amber-200"
                        >
                          {contact.email}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-white/65">
                        <a
                          href={`tel:${contact.phone}`}
                          className="transition hover:text-amber-200"
                        >
                          {contact.phone}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-white/75">
                        {contact.inquiry_subject}
                      </td>
                      <td className="max-w-sm px-4 py-4 text-sm leading-6 text-white/58">
                        {contact.message}
                      </td>
                      <td className="rounded-r-2xl px-4 py-4 text-sm text-white/45">
                        {formatDate(contact.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
