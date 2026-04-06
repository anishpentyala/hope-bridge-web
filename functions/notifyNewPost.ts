import { Resend } from 'npm:resend@4.0.0';

const TO_EMAIL = Deno.env.get('CONTACT_TO_EMAIL') || 'hopebridgecommunityservices@gmail.com';
const FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const topicLabels: Record<string, string> = {
  cultural_identity: 'Embracing Cultural Identity',
  academic_stress: 'Academic Pressure & Success',
  family_pressures: 'Disconnect Between Teens & Families'
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey'
      }
    });
  }

  try {
    const body = await req.json();
    const { title, topic, content, author_name } = body;

    if (!title || !content) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!resend) {
      console.log('RESEND_API_KEY not configured. New post notification skipped:', { title, topic });
      return Response.json({ success: true, delivered: false, reason: 'RESEND_API_KEY not configured' });
    }

    const topicLabel = topicLabels[topic] || topic || 'General';
    const preview = content.length > 300 ? content.slice(0, 297) + '...' : content;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 22px;">New Story Posted on Hope Bridge</h1>
        </div>
        <div style="background: #f8fafc; padding: 24px 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1e293b; margin: 0 0 8px 0; font-size: 20px;">${title}</h2>
          <p style="color: #64748b; margin: 0 0 16px 0; font-size: 14px;">
            <strong>Topic:</strong> ${topicLabel} &nbsp;|&nbsp;
            <strong>Author:</strong> ${author_name || 'Anonymous'}
          </p>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
            <p style="color: #334155; margin: 0; line-height: 1.6; white-space: pre-wrap;">${preview}</p>
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">
            Posted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
          </p>
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Story Posted: "${title}"`,
      html
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return Response.json({ error: result.error.message || 'Failed to send email' }, { status: 500 });
    }

    return Response.json({ success: true, delivered: true, id: result.data?.id || null });
  } catch (error) {
    console.error('Error sending new post notification:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
