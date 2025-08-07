//C:\coding\WEZ-ERP-APP\server\services\whatsappService.js
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

class WhatsAppService {
  constructor() {
    this.config = {
      idInstance: process.env.GREEN_API_INSTANCE,
      apiToken: process.env.GREEN_API_TOKEN,
      baseUrl: process.env.GREEN_API_URL
    };
  }

  async sendFile(phoneNumber, filePath, caption = '') {
  // Validate credentials first
  if (!this.config.apiToken || this.config.apiToken.includes(' ')) {
    throw new Error('Invalid Green API Token configuration');
  }

  // Format number (remove +, 0, spaces)
  const formattedNumber = String(phoneNumber)
    .replace(/\D/g, '')
    .replace(/^0+/, '')
    .replace(/^\+/, '');

  if (!formattedNumber.startsWith('91') || formattedNumber.length !== 12) {
    throw new Error(`Invalid Indian number format. Got: ${formattedNumber}`);
  }

  // Verify file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`PDF file not found at: ${filePath}`);
  }

  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath), {
      filename: `invoice_${Date.now()}.pdf`,
      contentType: 'application/pdf'
    });
    form.append('chatId', `${formattedNumber}@c.us`);
    form.append('caption', caption);

    console.log('Sending to Green API:', {
      url: `${this.config.baseUrl}/waInstance${this.config.idInstance}/sendFileByUpload/${this.config.apiToken}`,
      fileSize: fs.statSync(filePath).size
    });

    const response = await axios.post(
      `${this.config.baseUrl}/waInstance${this.config.idInstance}/sendFileByUpload/${this.config.apiToken}`,
      form,
      { 
        headers: form.getHeaders(),
        maxBodyLength: Infinity,
        timeout: 30000
      }
    );

    return { 
      success: true,
      data: response.data,
      messageId: response.data.idMessage 
    };
  } catch (error) {
    console.error('Full WhatsApp error:', {
      config: error.config,
      response: error.response?.data,
      message: error.message
    });
    throw error;
  }
}

  async ensureNumberWhitelisted(phoneNumber) {
    try {
      await axios.post(
        `${this.config.baseUrl}/waInstance${this.config.idInstance}/sendMessage/${this.config.apiToken}`,
        {
          chatId: `${phoneNumber}@c.us`,
          message: "Invoice access verification"
        }
      );
    } catch (error) {
      console.error('Whitelisting check failed:', error.message);
    }
  }
}

export default WhatsAppService;