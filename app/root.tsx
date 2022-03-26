import {
  Form,
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { LinksFunction, MetaFunction, LoaderFunction } from "remix";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import NavBar from "./components/NavBar";
import LanguageBar from "./components/LanguageBar";
import MaxWidthContainer from "./components/layout/MaxWidthContainer";
import CheckoutItem from "./components/checkout/CheckoutItem";
import { prisma } from "./db.server";
import { getItems, LineItem } from "./utils/stripe.server";
import { LineItemData } from "./types/checkout";
import { Donation } from "@prisma/client";
import { ChevronRightIcon } from "@heroicons/react/outline";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Hope Again | Ukraine",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  lineItemData: LineItemData[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const lineItems = await getItems(request);

  let userDonations = await prisma.donation.findMany({
    where: {
      stripeId: {
        in: lineItems.map((item: LineItem) => item.id),
      },
    },
  });

  // Add quantity to user donations
  const lineItemData: LineItemData[] = userDonations.map(
    (donation: Donation) => {
      const lineItem = lineItems.find(
        (item: LineItem) => item.id === donation.stripeId
      );
      return {
        ...donation,
        quantity: lineItem.quantity,
      };
    }
  );
  return json<LoaderData>({
    user: await getUser(request),
    lineItemData,
  });
};

export default function App() {
  const data = useLoaderData() as LoaderData;

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <LanguageBar />
        <NavBar />
        <Outlet />

        {data.lineItemData.length > 0 ? (
          <div className="fixed bottom-0 w-full bg-slate-200">
            <MaxWidthContainer classes="py-3">
              <div className="flex items-center gap-4">
                {data.lineItemData.map((item) => (
                  <CheckoutItem checkoutItem={item} key={item.id} />
                ))}
                <Form
                  action="/donate/checkout"
                  method="post"
                  className="ml-auto"
                >
                  <button className="flex items-center rounded bg-yellow-600 px-3 py-1 text-xl font-bold text-white ">
                    Checkout <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </button>
                </Form>
              </div>
            </MaxWidthContainer>
          </div>
        ) : null}
        <footer className="flex w-full flex-col items-center justify-center">
          <img
            src="https://res.cloudinary.com/pineapple-solutions/image/upload/v1648255660/HopeAgainUkraine/logo_mk9ock.png"
            alt="Hope"
            className="mb-4 w-28"
          />
          <p>&copy; 2022 Hope Again Foundation</p>
        </footer>
        <div className="h-6" />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
