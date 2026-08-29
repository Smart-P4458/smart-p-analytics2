/// <reference types="node" />
const MAKE_WEBHOOK_URL =
  process.env.MAKE_WEBHOOK_URL;

export default async function handler(
  request: Request
) {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Method not allowed.",
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (!MAKE_WEBHOOK_URL) {
    console.error(
      "MAKE_WEBHOOK_URL is not configured."
    );

    return new Response(
      JSON.stringify({
        success: false,
        message: "Server configuration error.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      subject,
      notes,
      source,
      submittedAt,
    } = body;

    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !notes?.trim()
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message:
            "Please complete all required fields.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const makeResponse = await fetch(
      MAKE_WEBHOOK_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone?.trim() || "",
          subject: subject.trim(),
          notes: notes.trim(),
          source:
            source ||
            "Smart-P Analytics Portfolio",
          submittedAt:
            submittedAt ||
            new Date().toISOString(),
        }),
      }
    );

    if (!makeResponse.ok) {
      console.error(
        "Make webhook returned:",
        makeResponse.status
      );

      return new Response(
        JSON.stringify({
          success: false,
          message:
            "Unable to send your message. Please try again.",
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Your message has been sent successfully.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Contact function error:",
      error
    );

    return new Response(
      JSON.stringify({
        success: false,
        message:
          "Something went wrong. Please try again.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
