"use client";
import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";

// ─── Services List ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    name: "Dog Walking",
    imgSrc: "/images/booking/dog-walking.png",
  },
  {
    name: "Drop-In Visits",
    imgSrc: "/images/booking/drop-in-visit.png",
  },
  {
    name: "Daycare",
    imgSrc: "/images/booking/daycare.png",
  },
  {
    name: "House Sitting",
    imgSrc: "/images/booking/house-sitting.png",
  },
  {
    name: "Boarding",
    imgSrc: "/images/booking/boarding.png",
  },
] as const;

const FORM_CLASS = " bg-secondaryColor mx-2 p-6 rounded-lg shadow-md";


// At the top of your file (e.g. src/app/page.tsx or wherever you keep SERVICE_NOTES)
const SERVICE_NOTES_JSX: Record<ServiceType, JSX.Element> = {
  "Dog Walking": (
    <div className="space-y-4">
      <p>
        Rates and scheduling for our Dog Walking service:
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>Rates may be subject to change without prior notice.</li>
        <li>All prices are subject to HST.</li>
      </ul>
      <p>
        <strong>Important:</strong> For multiple dogs or a customized quote, please contact us directly. We’re committed to giving every pup an excellent outdoor experience.
      </p>
    </div>
  ),

  "Drop-In Visits": (
    <div className="space-y-4">
      <p>
        Our Drop-In Visits include feeding, playtime, and home check-ins:
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>All pricing is subject to HST and may change without notice.</li>
        <li>Additional fees apply for more than one pet.</li>
      </ul>
      <p>
        <strong>Need special accommodations?</strong> Let us know if your pet requires medication or extra attention. We look forward to caring for your furry friend!
      </p>
    </div>
  ),

  Daycare: (
    <div className="space-y-4">
      <p>
        Please note that we only accept dogs under <strong>30lbs</strong> for this service.
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>All pricing is subject to applicable taxes.</li>
        <li>Rates may be subject to change without prior notice.</li>
        <li>Please review our policy page for more information</li>
      </ul>
      <p>
        <strong>Questions?</strong> For any additional dogs or customized quote or any further inquiries, feel free to contact us directly. We look forward to providing excellent care for your furry companion.
      </p>
    </div>
  ),

"House Sitting": (
  <div className="space-y-4">
    <p>
      Our House Sitting service provides in-home overnight care so your dog feels safe and comfortable while you're away.
    </p>

    <ul className="list-disc list-inside space-y-1">
      <li>
        <strong>Pricing:</strong> $70 + HST per night (24-hour period).
        <br />
        This includes staying overnight in your home, feeding, regular walks, playtime, and providing companionship and security for your dog.
      </li>

      <li>
        <strong>Extended Hours:</strong>
        <ul className="list-disc list-inside ml-5 space-y-1">
          <li>An additional $35 will be charged for any extension beyond the 24-hour period upto 8 hours.</li>
          <li>An additional $70 (full price) will be charged for any extension that is beyond the 24 hour period over 8 hours.</li>
        </ul>
      </li>

      <li>
        <strong>Second Dog Discount:</strong> If you have two dogs that require house sitting services, the rate for the second dog will be discounted to $55 per night for a 24-hour period.
      </li>

      <li>All pricing is subject to applicable taxes.</li>
      <li>Rates may be subject to change without prior notice.</li>
      <li>
        A deposit or prepayment may be required to secure your house sitting reservation.
      </li>
      <li>
        Additional services, such as watering plants or bringing in mail, may be available at no extra cost. Please discuss your specific requirements when booking.
      </li>
    </ul>

    <p>
      <strong>Need help?</strong> Reach out to us for a customized quote or if you have any special requests. We're here to provide top-notch care and peace of mind while you're away.
    </p>
  </div>
),


  Boarding: (
    <div className="space-y-4">
      <p>
        Our Boarding service offers overnight care, feeding, and playtime:
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>
          $60 +hst per night for a 24-hour period.
        </li>
        <li>
          This includes overnight care, feeding, regular walks, playtime, and a comfortable resting area for your dog.
        </li>
        <li>
      Additionally we offer a discount for the second dog at the rate of $45 per night.
        </li>
        <li>
          <strong>Extended Hours:</strong>
          <ul className="list-disc list-inside ml-5 space-y-1">
            <li>An additional $30 will be charged for any extension beyond the 24-hour period, upto 8 hours.</li>
            <li>An additional $60 (full price) will be charged for any extension beyond the 24 hour period over 8 hours.</li>
          </ul>
        </li>
        <p><strong>Please Note:</strong></p>
        <li>Rates may be subject to change without prior notice.</li>
        <li>All pricing is subject to applicable taxes.</li>
        <li>A deposit or prepayment may be required to secure your dog's boarding reservation.</li>
      </ul>
      <p>
        <strong>Looking for something special?</strong> Contact us for personalized quotes or multi-pet stays. We’re dedicated to making your dog’s stay as comfortable as possible.
      </p>
    </div>
  ),
};


type ServiceType = (typeof SERVICES)[number]["name"];

type BookingFormProps = {
  service: ServiceType;
  onSubmit: (data: FormData) => void;
};

// ─── Utility Data & Functions ───────────────────────────────────────────────────
const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Given a chosenDate string ("YYYY-MM-DD"), returns an array of length 7
 * where each index idx (0..6) is the next calendar date (YYYY-MM-DD) after chosenDate
 * that falls on weekday idx. If chosenDate itself is that weekday, it returns the date one week later.
 */
function computeNextWeekdayDates(chosenDate: string): (string | null)[] {
  if (!chosenDate) return Array(7).fill(null);

  const [y, m, d] = chosenDate.split("-").map((x) => parseInt(x, 10));
  const base = new Date(y, m - 1, d);
  const baseDow = base.getDay(); // 0..6

  return Array.from({ length: 7 }, (_, idx) => {
    let rawDiff = (idx - baseDow + 7) % 7;
    if (rawDiff === 0) rawDiff = 7; // if same weekday, push to next week
    const target = new Date(base);
    target.setDate(base.getDate() + rawDiff);
    const mm = String(target.getMonth() + 1).padStart(2, "0");
    const dd = String(target.getDate()).padStart(2, "0");
    return `${target.getFullYear()}-${mm}-${dd}`; // "YYYY-MM-DD"
  });
}

/**
 * Converts a "YYYY-MM-DD" string into "M/D" (no leading zeros).
 * If the input is null or empty, returns an empty string.
 */
function formatMd(dateStr: string | null): string {
  if (!dateStr) return "";
  const [_, mm, dd] = dateStr.split("-");
  return `${Number(mm)}/${Number(dd)}`;
}

// ─── WEEKDAY SELECTOR COMPONENT ─────────────────────────────────────────────────
interface WeekdaySelectorProps {
  chosenDate: string;
  setChosenDate: (date: string) => void;
}
function WeekdaySelector({ chosenDate, setChosenDate }: WeekdaySelectorProps) {
  // 1) Compute next occurrence dates for each weekday
  const weekdayDates = computeNextWeekdayDates(chosenDate);
  const weekdayLabels = weekdayDates.map(formatMd);

  // 2) Determine which weekday the user picked (0=Sunday…6=Saturday) in LOCAL time
  let selectedDow: number | null = null;
  if (chosenDate) {
    const [yy, mm, dd] = chosenDate.split("-").map((x) => parseInt(x, 10));
    selectedDow = new Date(yy, mm - 1, dd).getDay();
  }

  // 3) Build an ordering starting from selectedDow, wrapping around
  const weekdayOrder: number[] =
    selectedDow !== null
      ? Array.from({ length: 7 }, (_, i) => (selectedDow + i) % 7)
      : [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="block mb-4">
      <label className="block mb-2">
        Start Date
        <input
          type="date"
          name="startDate"
          className="mt-1 block w-full border-gray-300 rounded-md"
          value={chosenDate}
          onChange={(e) => setChosenDate(e.target.value)}
          required
        />
      </label>

      <p className="italic text-sm mb-2">
        Only check if your walk is repeated at the same time on these weekdays:
      </p>
      <div className="grid grid-cols-1 gap-2">
        {weekdayOrder.map((idx) => {
          if (selectedDow === idx) {
            return (
              <label
                key={idx}
                className="inline-flex items-center opacity-50 cursor-not-allowed"
              >
                <input
                  type="checkbox"
                  name="recurrenceDays"
                  value={String(idx)}
                  disabled
                  className="mr-2"
                />
                {weekdayNames[idx]} (Already selected)
              </label>
            );
          }
          const nextLabel = weekdayLabels[idx]; // e.g. “6/24”
          return (
            <label key={idx} className="inline-flex items-center">
              <input
                type="checkbox"
                name="recurrenceDays"
                value={String(idx)}
                className="mr-2"
              />
              {weekdayNames[idx]}
              {nextLabel ? ` (${nextLabel})` : ""}
            </label>
          );
        })}
      </div>
    </div>
  );
}

// ─── DOG WALKING FORM ─────────────────────────────────────────────────────────────
function DogWalkingForm({ service, onSubmit }: BookingFormProps) {
  const [chosenDate, setChosenDate] = useState<string>("");
  const [additionalIds, setAdditionalIds] = useState<number[]>([]);
  const [nextAddId, setNextAddId] = useState<number>(0);

  const addBooking = () => {
    if (additionalIds.length < 3) {
      setAdditionalIds((prev) => [...prev, nextAddId]);
      setNextAddId((prev) => prev + 1);
    }
  };

  const removeBooking = (id: number) => {
    setAdditionalIds((prev) => prev.filter((x) => x !== id));
  };

  return (
    <form
      className={FORM_CLASS}
      onSubmit={(e) => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const data = new FormData(formEl);
        // (1) figure out which weekday the user picked
        if (chosenDate) {
          const [yy, mm, dd] = chosenDate
            .split("-")
            .map((x) => parseInt(x, 10));
          const baseDow = new Date(yy, mm - 1, dd).getDay();

          // (2) see if the user checked any other weekdays
          const existingRecurrence = data.getAll("recurrenceDays").map(String);
          // always include today’s weekday
          if (!existingRecurrence.includes(String(baseDow))) {
            data.append("recurrenceDays", String(baseDow));
          }
        }

        // 1) Compute “endTime” from the main duration dropdown
        const startDateStr = (
          formEl.elements.namedItem("startDate") as HTMLInputElement
        ).value;
        const startTimeStr = (
          formEl.elements.namedItem("startTime") as HTMLInputElement
        ).value;
        const durationMinutes = parseInt(
          (formEl.elements.namedItem("durationOption") as HTMLSelectElement)
            .value,
          10
        );
        const [sh, sm] = startTimeStr.split(":").map((x) => parseInt(x, 10));
        const [y, M, d] = startDateStr.split("-").map((x) => parseInt(x, 10));
        const startDateObj = new Date(y, M - 1, d, sh, sm);
        const endDateObj = new Date(
          startDateObj.getTime() + durationMinutes * 60000
        );
        const pad = (n: number) => n.toString().padStart(2, "0");
        const endTimeStr = `${pad(endDateObj.getHours())}:${pad(
          endDateObj.getMinutes()
        )}`;

        data.append("service", service);
        data.append("durationOption", String(durationMinutes));
        data.append("endTime", endTimeStr);

        // ─── Extra fields (“additionalStartTime” / “additionalDurationOption”)
        // come through automatically in FormData if present.

        // NOTE: We removed the “force‐append chosenDate’s weekday” logic entirely here,
        //      because recurrenceDays checkboxes already handle the weekdays.

        onSubmit(data);
      }}
    >
      <h2 className="text-xl font-bold mb-4">Dog Walking Booking</h2>

      <label className="block mb-2">
        Full Name
        <input
          type="text"
          name="fullName"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Email
        <input
          type="email"
          name="email"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Phone Number
        <input
          type="tel"
          name="phone"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-4">
        Select Walk Duration &amp; Price
        <select
          name="durationOption"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            -- choose one --
          </option>
          <option value="30 min walk $20 +HST">30 min walk $20 +HST</option>
          <option value="45 min walk $27 +HST">45 min walk $27 +HST</option>
          <option value="60 min walk $35 +HST">60 min walk $35 +HST</option>
          <option value="2 dogs 30 min walk $35 +HST">2 dogs 30 min walk $35 +HST</option>
          <option value="2 dogs 60 min walk $50 +HST">2 dogs 60 min walk $50 +HST</option>
        </select>
      </label>

      <label className="block mb-2">
        Start Time
        <input
          type="time"
          name="startTime"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      {/* WEEKDAY SELECTOR (date input + checkboxes) */}
      <WeekdaySelector chosenDate={chosenDate} setChosenDate={setChosenDate} />

      {/* Add-Additional-Booking Button */}
      <button
        type="button"
        onClick={addBooking}
        disabled={additionalIds.length >= 3}
        className="mb-4 inline-flex items-center text-blue-600 hover:underline"
      >
        <span className="text-xl mr-1">＋</span>
        Add Additional Booking for Same Day
      </button>

      {/* Render up to three additional booking blocks */}
      {additionalIds.map((id) => (
        <div
          key={id}
          className="mb-4 p-4 border border-gray-200 rounded-md relative"
        >
          <button
            type="button"
            onClick={() => removeBooking(id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>

          <label className="block mb-2">
            Additional Start Time
            <input
              type="time"
              name="additionalStartTime"
              className="mt-1 block w-full border-gray-300 rounded-md"
              required
            />
          </label>

          <label className="block mb-2">
            Additional Duration &amp; Price
            <select
              name="additionalDurationOption"
              className="mt-1 block w-full border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                -- choose one --
              </option>
              <option value="30 min walk $20 +HST">30 min walk $20 +HST</option>
              <option value="45 min walk $27 +HST">45 min walk $27 +HST</option>
              <option value="60 min walk $35 +HST">60 min walk $35 +HST</option>
              <option value="2 dogs 30 min walk $35 +HST">2 dogs 30 min walk $35 +HST</option>
              <option value="2 dogs 60 min walk $50 +HST">2 dogs 60 min walk $50 +HST</option>
            </select>
          </label>
        </div>
      ))}

      <label className="block mb-4">
        Message / Special Instructions
        <textarea
          name="message"
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-md"
      >
        Book Dog Walking
      </button>
    </form>
  );
}

// ─── HOUSE SITTING FORM (unchanged) ────────────────────────────────────────────
function HouseSittingForm({ service, onSubmit }: BookingFormProps) {
  return (
    <form
      className={FORM_CLASS}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        data.append("service", service);
        data.append(
          "endTime",
          (e.currentTarget.elements.namedItem("endTime") as HTMLInputElement)
            .value
        );
        onSubmit(data);
      }}
    >
      <h2 className="text-xl font-bold mb-4">House Sitting Booking</h2>

      <label className="block mb-2">
        First Name
        <input
          type="text"
          name="firstName"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Last Name
        <input
          type="text"
          name="lastName"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Email
        <input
          type="email"
          name="email"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Phone Number
        <input
          type="tel"
          name="phone"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Start Date
        <input
          type="date"
          name="startDate"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Start Time
        <input
          type="time"
          name="startTime"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        End Date
        <input
          type="date"
          name="endDate"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        End Time
        <input
          type="time"
          name="endTime"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-4">
        Please specify number of dogs / Special Instructions
        <textarea
          name="message"
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-md"
      >
        Book House Sitting
      </button>
    </form>
  );
}

// ─── DROP-IN VISITS FORM ───────────────────────────────────────────────────────────
function DropInVisitsForm({ service, onSubmit }: BookingFormProps) {
  const [chosenDate, setChosenDate] = useState<string>("");
  const [additionalIds, setAdditionalIds] = useState<number[]>([]);
  const [nextAddId, setNextAddId] = useState<number>(0);

  const addBooking = () => {
    if (additionalIds.length < 3) {
      setAdditionalIds((prev) => [...prev, nextAddId]);
      setNextAddId((prev) => prev + 1);
    }
  };

  const removeBooking = (id: number) => {
    setAdditionalIds((prev) => prev.filter((x) => x !== id));
  };

  return (
    <form
      className={FORM_CLASS}
      onSubmit={(e) => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const data = new FormData(formEl);

        // (1) figure out which weekday the user picked
        if (chosenDate) {
          const [yy, mm, dd] = chosenDate
            .split("-")
            .map((x) => parseInt(x, 10));
          const baseDow = new Date(yy, mm - 1, dd).getDay();

          // (2) see if the user checked any other weekdays
          const existingRecurrence = data.getAll("recurrenceDays").map(String);
          // always include today’s weekday
          if (!existingRecurrence.includes(String(baseDow))) {
            data.append("recurrenceDays", String(baseDow));
          }
        }

        // Compute endTime for main block
        const startDateStr = (
          formEl.elements.namedItem("startDate") as HTMLInputElement
        ).value;
        const startTimeStr = (
          formEl.elements.namedItem("startTime") as HTMLInputElement
        ).value;
        const durationValue = (
          formEl.elements.namedItem("durationOption") as HTMLSelectElement
        ).value;
        const durationMinutes = parseInt(durationValue.split("_")[0], 10);

        const [sh, sm] = startTimeStr.split(":").map((x) => parseInt(x, 10));
        const [y, M, d] = startDateStr.split("-").map((x) => parseInt(x, 10));
        const startDateObj = new Date(y, M - 1, d, sh, sm);
        const endDateObj = new Date(
          startDateObj.getTime() + durationMinutes * 60000
        );
        const pad = (n: number) => n.toString().padStart(2, "0");
        const endTimeStr = `${pad(endDateObj.getHours())}:${pad(
          endDateObj.getMinutes()
        )}`;

        data.append("service", service);
        data.append("durationOption", String(durationMinutes));
        data.append("endTime", endTimeStr);

        // WEEKDAY SELECTOR (date input + checkboxes)
        // NOTE: We removed “force‐inject chosenDate’s weekday” logic:
        // recurrenceDays checkboxes handle the weekdays.

        // AdditionalStartTime & AdditionalDurationOption fields
        // come through if present.

        onSubmit(data);
      }}
    >
      <h2 className="text-xl font-bold mb-4">Drop-In Visits Booking</h2>

      <label className="block mb-2">
        Full Name
        <input
          type="text"
          name="fullName"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Email
        <input
          type="email"
          name="email"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Phone Number
        <input
          type="tel"
          name="phone"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-4">
        Select Visit Duration &amp; Price
        <select
          name="durationOption"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            -- choose one --
          </option>
          <option value="30 min drop-in visit $25 +HST">30 min drop-in visit $25 +HST</option>
          <option value="45 min drop-in visit $30 +HST">45 min drop-in visit $30 +HST</option>
          <option value="60 min drop-in visit $35 +HST">60 min drop-in visit $35 +HST</option>
          <option value="2 dogs 30 min drop-in $40 +HST">2 dogs 30 min drop-in $40 +HST</option>
          <option value="2 dogs 60 min drop-in $50 +HST">2 dogs 60 min drop-in $50 +HST</option>
        </select>
      </label>

      <label className="block mb-2">
        Start Time
        <input
          type="time"
          name="startTime"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      {/* WEEKDAY SELECTOR (date input + checkboxes) */}
      <WeekdaySelector chosenDate={chosenDate} setChosenDate={setChosenDate} />

      {/* Add-Additional-Booking Button */}
      <button
        type="button"
        onClick={addBooking}
        disabled={additionalIds.length >= 3}
        className="mb-4 inline-flex items-center text-blue-600 hover:underline"
      >
        <span className="text-xl mr-1">＋</span>
        Add Additional Booking for Same Day
      </button>

      {/* Render up to three additional booking blocks */}
      {additionalIds.map((id) => (
        <div
          key={id}
          className="mb-4 p-4 border border-gray-200 rounded-md relative"
        >
          <button
            type="button"
            onClick={() => removeBooking(id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>

          <label className="block mb-2">
            Additional Start Time
            <input
              type="time"
              name="additionalStartTime"
              className="mt-1 block w-full border-gray-300 rounded-md"
              required
            />
          </label>

          <label className="block mb-2">
            Additional Duration &amp; Price
            <select
              name="additionalDurationOption"
              className="mt-1 block w-full border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>
                -- choose one --
              </option>
              <option value="30 min drop-in visit $25 +HST">30 min drop-in visit $25 +HST</option>
              <option value="45 min drop-in visit $30 +HST">45 min drop-in visit $30 +HST</option>
              <option value="60 min drop-in visit $35 +HST">60 min drop-in visit $35 +HST</option>
              <option value="2 dogs 30 min drop-in $40 +HST">2 dogs 30 min drop-in $40 +HST</option>
              <option value="2 dogs 60 min drop-in $50 +HST">2 dogs 60 min drop-in $50 +HST</option>
            </select>
          </label>
        </div>
      ))}

      <label className="block mb-4">
        Message / Special Instructions
        <textarea
          name="message"
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-md"
      >
        Book Drop-In Visit
      </button>
    </form>
  );
}

// ─── BOARDING FORM ───────────────────────────────────────────────────────────────
function BoardingForm({ service, onSubmit }: BookingFormProps) {
  return (
    <form
      className={FORM_CLASS}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        data.append("service", service);
        data.append(
          "endTime",
          (e.currentTarget.elements.namedItem("endTime") as HTMLInputElement)
            .value
        );
        onSubmit(data);
      }}
    >
      <h2 className="text-xl font-bold mb-4">Boarding Booking</h2>

      <label className="block mb-2">
        First Name
        <input
          type="text"
          name="firstName"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Last Name
        <input
          type="text"
          name="lastName"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Email
        <input
          type="email"
          name="email"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Phone Number
        <input
          type="tel"
          name="phone"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Start Date
        <input
          type="date"
          name="startDate"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Start Time
        <input
          type="time"
          name="startTime"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        End Date
        <input
          type="date"
          name="endDate"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        End Time
        <input
          type="time"
          name="endTime"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-4">
        Please specify number of dogs / Special Instructions
        <textarea
          name="message"
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-2 rounded-md"
      >
        Book Boarding
      </button>
    </form>
  );
}

// ─── DAYCARE FORM ────────────────────────────────────────────────────────────────
export function DaycareForm({ service, onSubmit }: BookingFormProps) {
  const [chosenDate, setChosenDate] = useState<string>("");
  const [durationOption, setDurationOption] = useState<string>(""); // "8", "9", "10", "12", or "custom"
  const [customEndTime, setCustomEndTime] = useState<string>("");

  return (
    <form
      className={FORM_CLASS}
      onSubmit={(e) => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const data = new FormData(formEl);

        // (1) figure out which weekday the user picked
        if (chosenDate) {
          const [yy, mm, dd] = chosenDate
            .split("-")
            .map((x) => parseInt(x, 10));
          const baseDow = new Date(yy, mm - 1, dd).getDay();

          // (2) see if the user checked any other weekdays
          const existingRecurrence = data.getAll("recurrenceDays").map(String);
          // always include today’s weekday
          if (!existingRecurrence.includes(String(baseDow))) {
            data.append("recurrenceDays", String(baseDow));
          }
        }
        // 1) Determine endTime based on selected preset hours or custom entry
        const startDateStr = (
          formEl.elements.namedItem("startDate") as HTMLInputElement
        ).value;
        const startTimeStr = (
          formEl.elements.namedItem("startTime") as HTMLInputElement
        ).value;

        let endTimeStrValue = "";
        if (durationOption && durationOption !== "custom") {
          const hoursToAdd = parseInt(durationOption, 10);
          const [sh, sm] = startTimeStr.split(":").map((x) => parseInt(x, 10));
          const [y, M, d] = startDateStr.split("-").map((x) => parseInt(x, 10));
          const startDateObj = new Date(y, M - 1, d, sh, sm);
          const endDateObj = new Date(
            startDateObj.getTime() + hoursToAdd * 60 * 60000
          );
          const pad = (n: number) => n.toString().padStart(2, "0");
          endTimeStrValue = `${pad(endDateObj.getHours())}:${pad(
            endDateObj.getMinutes()
          )}`;
        } else if (durationOption === "custom") {
          endTimeStrValue = customEndTime;
        }

        data.append("service", service);
        data.append("durationOption", durationOption);
        data.append("endTime", endTimeStrValue);

        // WEEKDAY SELECTOR (date input + checkboxes)
        // NOTE: We removed “force‐inject chosenDate’s weekday” logic:
        // recurrenceDays checkboxes handle the weekdays.

        onSubmit(data);
      }}
    >
      <h2 className="text-xl font-bold mb-4">Daycare Booking</h2>

      <label className="block mb-2">
        Full Name
        <input
          type="text"
          name="fullName"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Email
        <input
          type="email"
          name="email"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Phone Number
        <input
          type="tel"
          name="phone"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-2">
        Start Time
        <input
          type="time"
          name="startTime"
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        />
      </label>

      <label className="block mb-4">
        Select Duration or Custom End Time
        <select
          name="durationOption"
          value={durationOption}
          onChange={(e) => setDurationOption(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>
            -- choose duration --
          </option>
          <option value="8 Hours $35 +HST">8 Hours $35 +HST</option>
          <option value="9 Hours $40 +HST">9 Hours $40 +HST</option>
          <option value="10 Hours $50 +HST">10 Hours $50 +HST</option>
          <option value="12 Hours $60 +HST">12 Hours $60 +HST</option>
          <option value="custom">Custom End Time</option>
        </select>
      </label>

      {durationOption === "custom" && (
        <label className="block mb-4">
          End Time
          <input
            type="time"
            name="endTime"
            value={customEndTime}
            onChange={(e) => setCustomEndTime(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </label>
      )}

      {/* WEEKDAY SELECTOR (date input + checkboxes) */}
      <WeekdaySelector chosenDate={chosenDate} setChosenDate={setChosenDate} />

      <label className="block mb-4">
        Please specify number of dogs / Special Instructions
        <textarea
          name="message"
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-purple-400 hover:bg-purple-500 text-white font-semibold py-2 rounded-md"
      >
        Book Daycare
      </button>
    </form>
  );
}

// ─── MAIN PAGE COMPONENT ─────────────────────────────────────────────────────────
const Home: NextPage = () => {
  const [selectedService, setSelectedService] = useState<ServiceType>(
    "Dog Walking"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Store the returned “events” array so we can display a booking summary
  const [bookingResults, setBookingResults] = useState<
    | {
        occurrenceIndex: number;
        totalOccurrences: number;
        service: string;
        start: string;
        end: string;
      }[]
    | null
  >(null);

  // Called by each form’s onSubmit
  async function handleFormSubmit(formData: FormData) {
    setIsSubmitting(true);
    setFeedback(null);
    setBookingResults(null);

    // Convert FormData → plain object
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      // collapse multiple checkboxes or repeated fields into comma‐separated
      if (payload[key]) {
        payload[key] = payload[key] + "," + value.toString();
      } else {
        payload[key] = value.toString();
      }
    });

    try {
      const res = await fetch("/api/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorJson = await res.json();
        throw new Error(errorJson.message || "Unknown error");
      }

      // Grab the returned JSON (which now contains an “events” array)
      const json = await res.json();
      setBookingResults(json.events); // store that array
      setFeedback("Booking successful! 🎉");
      setSelectedService("Dog Walking");
    } catch (err: any) {
      console.error("Booking error:", err);
      setFeedback(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen py-5">
      <div className="max-w-primaryMaxWidth mx-auto rounded-2xl p-8">
        <div>
          <h1 className="text-2xl font-extrabold text-center mb-6">
            PICK YOUR PUP'S ADVENTURE
          </h1>

          {/* 1) Service Buttons */}
          <div className="flex flex-wrap gap-8 justify-center mb-8">
            {SERVICES.map(({ name, imgSrc }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => {
                  setSelectedService(name);
                  setFeedback(null);
                  setBookingResults(null);
                }}
                
              >
                <Image
                  src={imgSrc}
                  alt={name}
                  width={150}
                  height={150}
                  className="rounded-[40px] "
                />
                <button
                  disabled={isSubmitting}
                  className={`px-2 py-3  rounded-xl font-bold transition-shadow duration-150 ${
                    selectedService === name
                      ? "bg-primaryColor shadow-lg text-white"
                      : " text-gray-800"
                  } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {name.toUpperCase()}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full ">
            {/* 2) Feedback Message */}
            {feedback && (
              <div
                className={`max-w-md mx-auto mb-6 px-4 py-3 rounded ${
                  feedback.startsWith("Error")
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {feedback}
              </div>
            )}

            {/* 3) Conditionally render the chosen service’s form */}
            {selectedService === "Dog Walking" && (
              <DogWalkingForm
                service="Dog Walking"
                onSubmit={handleFormSubmit}
              />
            )}
            {selectedService === "House Sitting" && (
              <HouseSittingForm
                service="House Sitting"
                onSubmit={handleFormSubmit}
              />
            )}
            {selectedService === "Drop-In Visits" && (
              <DropInVisitsForm
                service="Drop-In Visits"
                onSubmit={handleFormSubmit}
              />
            )}
            {selectedService === "Boarding" && (
              <BoardingForm service="Boarding" onSubmit={handleFormSubmit} />
            )}
            {selectedService === "Daycare" && (
              <DaycareForm service="Daycare" onSubmit={handleFormSubmit} />
            )}

            {/* 4) Loading state */}
            {isSubmitting && (
              <div className="text-center mt-6 text-gray-600">
                Processing your booking...
              </div>
            )}

            {/* 5) BOOKING SUMMARY */}
            {bookingResults && (
              <div className="mt-8 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
                <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
                <ul className="space-y-2">
                  {bookingResults.map((evt) => {
                    // format start/end as “M/D/YYYY @ hh:mm AM/PM”
                    const startDateObj = new Date(evt.start);
                    const endDateObj = new Date(evt.end);
                    const opts: Intl.DateTimeFormatOptions = {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    };
                    const startStr = startDateObj.toLocaleString(
                      undefined,
                      opts
                    );
                    const endStr = endDateObj.toLocaleString(undefined, opts);

                    return (
                      <li key={evt.occurrenceIndex} className="border-b pb-2">
                        <p className="font-medium">
                          {evt.service} (#{evt.occurrenceIndex} of{" "}
                          {evt.totalOccurrences})
                        </p>
                        <p className="text-sm text-gray-700">
                          {startStr} – {endStr}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          {/* …inside your JSX, next to the forms… */}

<div className="w-full md:w-1/2">
  {selectedService ? (
    <div className="p-6 mb-6 bg-primaryColor80 rounded-md ">
      <h2 className="text-xl font-semibold mb-4">Please Note:</h2>
      <div className="text-sm text-gray-700 leading-relaxed">
        {SERVICE_NOTES_JSX[selectedService]}
      </div>
    </div>
  ) : (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-gray-600 text-center">
      Select a service above to see important details before booking.
    </div>
  )}
</div>



        </div>
      </div>
    </div>
  );
};

export default Home;
