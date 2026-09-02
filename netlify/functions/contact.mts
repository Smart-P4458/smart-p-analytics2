/// <reference types="node" />
import type {
  Handler,
  HandlerEvent,
  HandlerResponse,
} from "@netlify/functions";

const jsonResponse = (
  statusCode: number,
  body: unknown,
  extraHeaders: Record<string, string> = {}
): HandlerResponse => {
  return {
    statusCode,

    headers: {
      "Content-Type":
        "application/json",

      ...extraHeaders,
    },

    body: JSON.stringify(body),
  };
};

export const handler: Handler = async (
  event: HandlerEvent
): Promise<HandlerResponse> => {
  if (
    event.httpMethod !== "POST"
  ) {
    return jsonResponse(
      405,
      {
        success: false,
        message:
          "Method not allowed.",
      },
      {
        Allow: "POST",
      }
    );
  }

  try {
    if (!event.body) {
      return jsonResponse(
        400,
        {
          success: false,
          message:
            "Request body is required.",
        }
      );
    }

    const data =
      JSON.parse(event.body);

    const {
      fullName,
      email,
      phone,
      subject,
      message,
      source,
    } = data;

    if (
      !fullName ||
      !email ||
      !subject ||
      !message
    ) {
      return jsonResponse(
        400,
        {
          success: false,
          message:
            "Please complete all required fields.",
        }
      );
    }

    const webhookUrl =
      process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error(
        "MAKE_WEBHOOK_URL is missing."
      );

      return jsonResponse(
        500,
        {
          success: false,
          message:
            "Server configuration error.",
        }
      );
    }

    console.log(
      "Sending contact submission to Make:",
      {
        fullName,
        email,
        phone,
        subject,
        message,
        source,
      }
    );

    const response =
      await fetch(
        webhookUrl,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            fullName,
            email,
            phone,
            subject,
            message,

            source:
              source ||
              "Smart-P Analytics Portfolio Website",

            submittedAt:
              new Date().toISOString(),
          }),
        }
      );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "Make webhook error:",
        response.status,
        errorText
      );

      return jsonResponse(
        502,
        {
          success: false,
          message:
            "Unable to send your message right now. Please try again.",
        }
      );
    }

    return jsonResponse(
      200,
      {
        success: true,

        message:
          "Your message has been sent successfully.",
      }
    );
  } catch (error) {
    console.error(
      "Contact function error:",
      error
    );

    return jsonResponse(
      500,
      {
        success: false,

        message:
          "Something went wrong. Please try again.",
      }
    );
  }
};
