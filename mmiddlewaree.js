import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function mmiddlewaree(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });

  const homeUrl = req.nextUrl.clone();
  homeUrl.pathname = "/";
  homeUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);

  if (req.nextUrl.pathname === "/") {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("Middleware File, session:", session);

    if (session) {
      return NextResponse.redirect(homeUrl);
    }

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/sign-in";
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
}
