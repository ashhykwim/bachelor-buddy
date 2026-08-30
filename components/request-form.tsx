"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { categories } from "@/lib/data";

type FormState = {
  name: string;
  phone: string;
  category: string;
  area: string;
  message: string;
};

type RequestFormProps = {
  defaultCategory?: string;
};

const emptyForm: FormState = {
  name: "",
  phone: "",
  category: "Laundry",
  area: "",
  message: ""
};

export function RequestForm({ defaultCategory }: RequestFormProps) {
  const [form, setForm] = useState<FormState>({
    ...emptyForm,
    category: defaultCategory && categories.includes(defaultCategory as (typeof categories)[number])
      ? defaultCategory
      : emptyForm.category
  });
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitLocked, setSubmitLocked] = useState(false);

  const serviceOptions = useMemo(() => categories, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    if (submitLocked) {
      return;
    }

    setSubmitLocked(true);
    setStatus("loading");

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Something went wrong.");
      }

      setMessage(payload.message ?? "Request sent successfully.");
      setStatus("success");
      setForm(emptyForm);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send enquiry.");
    } finally {
      setSubmitLocked(false);
    }
  }

  return (
    <form className="stack" id="enquiry-form" onSubmit={handleSubmit} noValidate>
      <div className="request-grid">
        <label className="field-group">
          <span className="field-label">Your name</span>
          <input
            className="field"
            value={form.name}
            placeholder="Your name"
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
            autoComplete="name"
          />
        </label>
        <label className="field-group">
          <span className="field-label">Phone number</span>
          <input
            className="field"
            value={form.phone}
            placeholder="Phone number"
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            required
            autoComplete="tel"
          />
        </label>
        <label className="field-group">
          <span className="field-label">Service category</span>
          <select
            className="field"
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
            required
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="field-group">
          <span className="field-label">Area / locality</span>
          <input
            className="field"
            value={form.area}
            placeholder="Area / locality"
            onChange={(event) => setForm({ ...form, area: event.target.value })}
            required
            autoComplete="address-level2"
          />
        </label>
        <label className="field-group full">
          <span className="field-label">What do you need?</span>
          <textarea
            className="field"
            rows={4}
            value={form.message}
            placeholder="Example: Need laundry pickup twice a week in Koramangala."
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            required
          />
        </label>
      </div>
      <div className="form-actions">
        <button className="button primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending enquiry..." : "Send enquiry"}
        </button>
        {status === "success" ? <span className="status success">{message}</span> : null}
        {status === "error" ? <span className="status error">{message}</span> : null}
      </div>
      {status === "idle" && message ? <div className="notice">{message}</div> : null}
      <p className="mini">
        We only store the enquiry details needed to contact you back.
      </p>
    </form>
  );
}
