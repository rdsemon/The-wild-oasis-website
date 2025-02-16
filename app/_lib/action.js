"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  updateGuest,
} from "./data-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("Please login first to update your profile");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  const regex = /^[a-zA-Z0-9]{6,12}$/;
  if (!regex.test(nationalID))
    throw new Error("Please provide your valid nationalID");

  const updateData = { nationality, nationalID, countryFlag };

  await updateGuest(session.user.guestId, updateData);

  revalidatePath("/account/profile");
}

export async function singInAction() {
  const res = await fetch("http://localhost:3000/api/auth/providers", {
    cache: "no-store",
  });
  const providers = await res.json();
  const providerId = Object.values(providers)
    .map((provider) => provider.id)
    .at(0);
  await signIn(`${providerId}`, { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Please Login First");
  const bookings = await getBookings(session.user.guestId);
  const bookedId = bookings.map((booking) => booking.id);
  if (!bookedId.includes(bookingId))
    throw new Error("You are not permited to delete this");
  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function updateGuestBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("Please login first");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const bookingId = formData.get("bookingId");
  const updateData = { numGuests, observations };
  await updateBooking(bookingId, updateData);
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect(`/account/reservations`);
}

export async function createGuestBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("Please login first");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
    isPaid: false,
    hasBreakfast: false,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirm",
    extraPrice: 0,
  };
  await createBooking(newBooking);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/account/reservations/thankyou");
}
