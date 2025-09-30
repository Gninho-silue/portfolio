require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { createClient } = require('@sanity/client');

const app = express();
const PORT = process.env.PORT || 5000;

// Client Sanity
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2025-02-19',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json());

// Route test
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Portfolio Backend API 🚀',
  });
});

// Route contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false,
        error: 'Tous les champs sont requis'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        error: 'Format d\'email invalide'
      });
    }

    // 1️⃣ STOCKER DANS SANITY
    let sanityResult = null;
    if (process.env.SANITY_API_TOKEN) {
      try {
        const contact = {
          _type: 'contact',
          name: name.trim(),
          email: email.toLowerCase().trim(),
          message: message.trim(),
          createdAt: new Date().toISOString(),
        };
        
        sanityResult = await sanityClient.create(contact);
        console.log('✅ Contact sauvegardé dans Sanity:', sanityResult._id);
      } catch (sanityError) {
        console.error('⚠️ Erreur Sanity (non-bloquant):', sanityError.message);
      }
    }

    // 2️⃣ ENVOYER PAR EMAIL
    let emailSent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `📩 Portfolio Contact: ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #6366f1;">Nouveau message depuis votre portfolio</h2>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>👤 Nom:</strong> ${name}</p>
                <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>💬 Message:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 5px;">${message}</p>
              </div>
              <p style="color: #6b7280; font-size: 12px;">
                ${sanityResult ? `Message ID: ${sanityResult._id}` : ''}
              </p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log('✅ Email envoyé');
      } catch (emailError) {
        console.error('⚠️ Erreur Email (non-bloquant):', emailError.message);
      }
    }

    // Réponse selon ce qui a fonctionné
    if (sanityResult || emailSent) {
      res.status(201).json({ 
        success: true,
        message: 'Message envoyé avec succès !',
        details: {
          savedInSanity: !!sanityResult,
          emailSent: emailSent,
          contactId: sanityResult?._id
        }
      });
    } else {
      res.status(500).json({ 
        success: false,
        error: 'Impossible d\'envoyer le message. Vérifiez la configuration du serveur.'
      });
    }

  } catch (error) {
    console.error('❌ Erreur:', error);
    res.status(500).json({ 
      success: false,
      error: 'Une erreur est survenue'
    });
  }
});

// Démarrage
app.listen(PORT, () => {
  console.log('\n🚀 Serveur démarré sur le port', PORT);
  console.log('📧 Email:', process.env.EMAIL_USER ? '✅' : '❌');
  console.log('🗄️ Sanity:', process.env.SANITY_API_TOKEN ? '✅' : '❌');
  console.log('');
});