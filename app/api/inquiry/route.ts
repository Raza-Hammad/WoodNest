type InquiryPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
  product?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  const name = asText(payload.name);
  const phone = asText(payload.phone);

  if (!name || !phone) {
    return Response.json(
      { ok: false, error: "Name and phone number are required" },
      { status: 422 },
    );
  }

  const inquiry = {
    name,
    phone,
    email: asText(payload.email),
    message: asText(payload.message).slice(0, 2000),
    product: asText(payload.product) || null,
    receivedAt: new Date().toISOString(),
  };

  // Replace with an email/CRM integration when the store goes live.
  console.log("[inquiry]", inquiry);

  return Response.json({ ok: true, inquiry });
}
