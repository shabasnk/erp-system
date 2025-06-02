import Shop from '../models/shopModel.js';

// Get current shop information
export const getShop = async (req, res) => {
    console.log("req.user:",req.user);
    console.log("req.user.id:",req.user.id);
    
    
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'Shop ID is missing from user data' });
    }

    const shop = await Shop.findOne({
      where: { id: req.user.id },
      attributes: ['id', 'ownerName', 'phoneNumber', 'email', 'shopName', 'address', 'type']
    });

    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.json(shop);
  } catch (error) {
    console.error('Error fetching shop:', error);
    res.status(500).json({ message: 'Error fetching shop information' });
  }
};


// Update shop information
export const updateShop = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
    }

    const { ownerName, phoneNumber } = req.body;
    
    if (!ownerName && !phoneNumber) {
      return res.status(400).json({ message: 'At least one field (ownerName or phoneNumber) is required' });
    }

    const updateData = {};
    if (ownerName) updateData.ownerName = ownerName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    const [updated] = await Shop.update(updateData, { 
      where: { id: req.user.id } 
    });

    if (!updated) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    const updatedShop = await Shop.findOne({
      where: { id: req.user.id },
      attributes: ['ownerName', 'phoneNumber']
    });

    return res.json({
      success: true,
      data: updatedShop
    });
    
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error while updating shop information' 
    });
  }
};