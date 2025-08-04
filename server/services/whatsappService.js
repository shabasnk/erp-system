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
    try {
      // First ensure number is whitelisted
      await this.ensureNumberWhitelisted(phoneNumber);

      const form = new FormData();
      form.append('file', fs.createReadStream(filePath));
      form.append('chatId', `${phoneNumber}@c.us`);
      form.append('caption', caption);

      const response = await axios.post(
        `${this.config.baseUrl}/waInstance${this.config.idInstance}/sendFileByUpload/${this.config.apiToken}`,
        form,
        { headers: form.getHeaders() }
      );

      return { success: true, data: response.data };
    } catch (error) {
      console.error('WhatsApp send error:', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data || error.message 
      };
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