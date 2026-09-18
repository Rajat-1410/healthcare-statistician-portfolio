import { Resend } from 'resend';
import multer from 'multer';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Helper to run multer middleware in Vercel function
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Disable Vercel's default body parser to allow multer to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await runMiddleware(req, res, upload.single('file'));
    
    const { category, query, name, email, timeline } = req.body;
    
    if (!category || !query || !name || !email || !timeline) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const file = req.file;
    const attachments = [];

    if (file) {
      const allowedTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
      ];
      
      if (!allowedTypes.includes(file.mimetype) && file.mimetype !== 'text/csv' && !file.originalname.endsWith('.csv')) {
        return res.status(400).json({ error: 'Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX, and CSV are allowed.' });
      }

      attachments.push({
        filename: file.originalname,
        content: file.buffer
      });
    }

    if (!resend) {
        return res.status(500).json({ error: 'RESEND_API_KEY not configured on server' });
    }

    const recipient = process.env.INQUIRY_TO_EMAIL;
    if (!recipient) {
       return res.status(500).json({ error: 'INQUIRY_TO_EMAIL not configured on server' });
    }

    const sender = 'onboarding@resend.dev'; 

    const { data, error } = await resend.emails.send({
      from: `Project Inquiry <${sender}>`,
      to: [recipient],
      subject: `New Project Inquiry \u2014 ${category}`,
      reply_to: email,
      html: `
        <div style="font-family: sans-serif; color: #1e293b; max-width: 600px;">
          <h2 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">New Project Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Project Type:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${category}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Timeline:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${timeline}</td>
            </tr>
          </table>
          <br />
          <h3 style="color: #0f172a;">Description:</h3>
          <p style="line-height: 1.6; white-space: pre-wrap; background: #f8fafc; padding: 16px; border-radius: 8px;">${query}</p>
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
