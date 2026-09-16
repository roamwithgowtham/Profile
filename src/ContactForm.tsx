import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCheck,
  Copy,
  LoaderCircle,
  Mail,
  Send,
} from "lucide-react";
import { profile } from "./data";

type SubmissionState = "idle" | "sending" | "success" | "activation" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState("");
  const [draftCc, setDraftCc] = useState("");
  const [copied, setCopied] = useState(false);
  const request = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const isSending = state === "sending";

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      request.current?.abort();
      clearTimeout(copyTimer.current);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (request.current) return;
    const formElement = event.currentTarget;
    const fields = new FormData(formElement);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const message = String(fields.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setState("error");
      setStatus(
        "Please add your name, email, and a message before continuing.",
      );
      return;
    }
    // Recheck native single-address validation even for programmatic submissions.
    if (!formElement.reportValidity()) return;
    if (String(fields.get("_honey") ?? "").trim()) {
      setState("error");
      setStatus("Please leave the website field empty and try again.");
      return;
    }

    const cc = email.toLowerCase() === profile.email.toLowerCase() ? "" : email;
    setDraft(`Hi Gowthaman!\n\n${message}\n\n${name}\n${email}`);
    setDraftCc(cc);
    setCopied(false);
    setState("sending");
    setStatus("Sending your message securely…");
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            name,
            email,
            message,
            _replyto: email,
            // FormSubmit controls From; CC does not authenticate a Gmail sender.
            ...(cc ? { _cc: cc } : {}),
            _subject: "New message — Roam with Gowthaman",
            _template: "table",
            _honey: "",
          }),
        },
      );
      if (!response.ok) throw new Error("Submission was rejected");
      const result: unknown = await response.json();
      if (
        !result ||
        typeof result !== "object" ||
        !("success" in result) ||
        (result.success !== true && result.success !== "true")
      ) {
        throw new Error("Submission was not accepted");
      }
      if (!mounted.current) return;
      const providerMessage =
        "message" in result && typeof result.message === "string"
          ? result.message
          : "";
      if (/activat|confirm.*email|verify.*email/i.test(providerMessage)) {
        setState("activation");
        setStatus(
          `Email activation is required. The owner of ${profile.email} must confirm the FormSubmit activation email, then this message can be sent again.`,
        );
      } else {
        setState("success");
        setStatus(
          `Your message was accepted by the email service.${cc ? " A copy was requested for your email address (CC)." : ""} First-time delivery requires the recipient’s email activation.`,
        );
        formElement.reset();
      }
    } catch {
      if (!mounted.current) return;
      setState("error");
      setStatus(
        "We couldn’t confirm that your message was sent. Your text is still here — try again, or use the email-app option below.",
      );
    } finally {
      clearTimeout(timeout);
      request.current = null;
    }
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatus(
        "Clipboard access is unavailable. Select and copy your message below instead.",
      );
    }
  }

  const fallbackUrl = `mailto:${profile.email}?subject=${encodeURIComponent("Hello — Roam with Gowthaman")}&body=${encodeURIComponent(draft)}${draftCc ? `&cc=${encodeURIComponent(draftCc)}` : ""}`;

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      aria-busy={isSending}
      aria-describedby="contact-privacy"
    >
      <div className="form-topline">
        <span>A little introduction goes a long way.</span>
        <Send size={18} />
      </div>
      <fieldset disabled={isSending}>
        <legend className="visually-hidden">Send Gowthaman a message</legend>
        <div className="form-row">
          <label>
            Your name
            <input
              name="name"
              placeholder="What should I call you?"
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
        </div>
        <label>
          What’s on your mind?
          <textarea
            name="message"
            placeholder="An idea, an adventure, or a simple hello…"
            rows={4}
            required
            maxLength={4000}
          />
        </label>
        <label className="form-honeypot" aria-hidden="true">
          Leave this website field empty
          <input name="_honey" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <button
          type="submit"
          className="button button-dark"
          disabled={isSending}
        >
          {isSending ? "Sending…" : "Send message"}
          {isSending ? (
            <LoaderCircle size={18} className="sending-spinner" />
          ) : (
            <ArrowUpRight size={18} />
          )}
        </button>
      </fieldset>
      <p id="contact-privacy" className="form-note">
        Your name, email, and message are shared with{" "}
        <a
          href="https://formsubmit.co/privacy.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          FormSubmit
        </a>{" "}
        for delivery to {profile.email}, with your entered email added as CC.
        Messages use FormSubmit’s sender address, not this Gmail account. First
        use requires recipient verification.
      </p>
      <a className="contact-direct" href={`mailto:${profile.email}`}>
        <Mail size={13} />
        {profile.email}
        <ArrowUpRight size={12} />
      </a>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={
          status ? `contact-feedback contact-feedback-${state}` : undefined
        }
      >
        {status}
      </div>
      {(state === "error" || state === "activation") && draft && (
        <div className="message-draft">
          <label>
            Your message draft
            <textarea readOnly value={draft} rows={5} />
          </label>
          <div className="draft-actions">
            <button type="button" className="copy-button" onClick={copyDraft}>
              {copied ? <CheckCheck size={15} /> : <Copy size={15} />}
              {copied ? "Copied!" : "Copy message"}
            </button>
            <a className="copy-button" href={fallbackUrl}>
              <Mail size={15} />
              Open email app
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
