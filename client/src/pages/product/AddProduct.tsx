import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/magicui/particles";
import { BorderBeam } from "@/components/magicui/border-beam";
import { TextAnimate } from "@/components/magicui/text-animate";
import { cn } from "@/lib/utils";

interface ProductFormData {
  name: string;
  price: string;
  description: string;
  categoryId: string;
  stockQuantity: string;
  image: string;
  discountPrice: string;
  sku: string;
  serialNumber: string;
  barcode: string;
  brand: string;
  weight: string;
  dimensions: string;
  expirationDate: string;
  tags: string;
  unitId: string;
  isActive: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const MemoizedTextAnimate = memo(() => (
  <TextAnimate className="text-center mb-6">Add New Product</TextAnimate>
));

const AddProduct = () => {
  const [product, setProduct] = useState<ProductFormData>({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    stockQuantity: "",
    image: "",
    discountPrice: "",
    sku: "",
    serialNumber: "",
    barcode: "",
    brand: "",
    weight: "",
    dimensions: "",
    expirationDate: "",
    tags: "",
    unitId: "",
    isActive: true,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = useCallback((name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Product name is required";
        if (value.trim().length < 2) return "Product name must be at least 2 characters";
        if (value.trim().length > 100) return "Product name must be less than 100 characters";
        return "";

      case "price":
        if (!value) return "Price is required";
        const price = parseFloat(value);
        if (isNaN(price)) return "Price must be a valid number";
        if (price <= 0) return "Price must be greater than 0";
        if (price > 999999.99) return "Price must be less than 1,000,000";
        return "";

      case "discountPrice":
        if (value) {
          const discountPrice = parseFloat(value);
          const regularPrice = parseFloat(product.price);
          if (isNaN(discountPrice)) return "Discount price must be a valid number";
          if (discountPrice < 0) return "Discount price cannot be negative";
          if (regularPrice && discountPrice >= regularPrice) {
            return "Discount price must be less than regular price";
          }
        }
        return "";

      case "description":
        if (value.length > 1000) return "Description must be less than 1000 characters";
        return "";

      case "categoryId":
        if (!value) return "Category ID is required";
        const categoryId = parseInt(value);
        if (isNaN(categoryId) || categoryId <= 0) return "Category ID must be a positive number";
        return "";

      case "unitId":
        if (!value) return "Unit ID is required";
        const unitId = parseInt(value);
        if (isNaN(unitId) || unitId <= 0) return "Unit ID must be a positive number";
        return "";

      case "stockQuantity":
        if (!value) return "Stock quantity is required";
        const stock = parseInt(value);
        if (isNaN(stock)) return "Stock quantity must be a valid number";
        if (stock < 0) return "Stock quantity cannot be negative";
        if (stock > 999999) return "Stock quantity must be less than 1,000,000";
        return "";

      case "image":
        if (value) {
          const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          if (!urlPattern.test(value)) return "Please enter a valid URL";
        }
        return "";

      case "sku":
  if (value && value.trim() !== "") {
    if (value.length < 3 || value.length > 50) {
      return "SKU must be between 3 and 50 characters";
    }
    // You could add an async check here if you want to verify uniqueness
  }
  return "";

      case "barcode":
        if (value) {
          const barcodePattern = /^[0-9]{8,13}$/;
          if (!barcodePattern.test(value)) return "Barcode must be 8-13 digits";
        }
        return "";

      case "brand":
        if (value && value.length > 50) return "Brand name must be less than 50 characters";
        return "";

      case "weight":
        if (value) {
          const weight = parseFloat(value);
          if (isNaN(weight)) return "Weight must be a valid number";
          if (weight <= 0) return "Weight must be greater than 0";
          if (weight > 10000) return "Weight must be less than 10,000 kg";
        }
        return "";

      case "dimensions":
        if (value) {
          const dimensionPattern = /^\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?$/i;
          if (!dimensionPattern.test(value)) {
            return "Dimensions must be in format: LengthxWidthxHeight (e.g., 10x5x3)";
          }
        }
        return "";

      case "expirationDate":
        if (value && value.trim() !== "") {
          const expiryDate = new Date(value);
          if (isNaN(expiryDate.getTime())) return "Invalid date format";
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (expiryDate <= today) return "Expiration date must be in the future";
        }
        return "";

      case "tags":
        if (value) {
          const tags = value.split(",").map(tag => tag.trim());
          if (tags.some(tag => tag.length > 30)) {
            return "Each tag must be less than 30 characters";
          }
          if (tags.length > 10) return "Maximum 10 tags allowed";
        }
        return "";

      default:
        return "";
    }
  }, [product.price]);

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    
    Object.keys(product).forEach(key => {
      if (key !== "isActive") {
        const error = validateField(key, product[key as keyof ProductFormData] as string);
        if (error) {
          newErrors[key] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [product, validateField]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      setProduct((prev) => ({ ...prev, [name]: value }));
      
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      }
      
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
      }
    },
    [errors, touched, validateField]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      setTouched(prev => ({ ...prev, [name]: true }));
      
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    },
    [validateField]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    const allTouched = Object.keys(product).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    if (validateForm()) {
      try {
       const submissionData = {
  ...product,
  tags: product.tags ? product.tags.split(",").map((t) => t.trim()) : [],
  price: parseFloat(product.price),
  discountPrice: product.discountPrice ? parseFloat(product.discountPrice) : null,
  categoryId: parseInt(product.categoryId),
  unitId: parseInt(product.unitId),
  stockQuantity: parseInt(product.stockQuantity),
  weight: product.weight ? parseFloat(product.weight) : null,
  expirationDate: product.expirationDate || null,
  sku: product.sku || null,
  serialNumber: product.serialNumber || null, // Convert empty string to null
  barcode: product.barcode || null, // Convert empty string to null
  isActive: product.isActive,
};

        const response = await fetch("http://localhost:8080/api/product/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
    const errorData = await response.json();
    if (errorData.constraint === 'products_sku_key') {
      throw new Error("SKU already exists. Please leave it blank or use a different SKU.");
    }
    throw new Error(errorData.message || "Failed to submit product");
  }

        const responseData = await response.json();
        console.log("Product submitted successfully:", responseData);
        
        setProduct({
          name: "",
          price: "",
          description: "",
          categoryId: "",
          stockQuantity: "",
          image: "",
          discountPrice: "",
          sku: "",
          serialNumber: "",
          barcode: "",
          brand: "",
          weight: "",
          dimensions: "",
          expirationDate: "",
          tags: "",
          unitId: "",
          isActive: true,
        });
        setTouched({});
        setErrors({});
        setSubmitSuccess(true);
      } catch (error) {
        console.error("Error submitting product:", error);
        setSubmitError(error instanceof Error ? error.message : "Error submitting product. Please try again.");
      }
    }
    
    setIsSubmitting(false);
  };

  const getFieldError = (fieldName: string): string => {
    return touched[fieldName] ? errors[fieldName] || "" : "";
  };

  const isFieldInvalid = (fieldName: string): boolean => {
    return touched[fieldName] && !!errors[fieldName];
  };

  return (
    <main className="relative min-h-screen w-full bg-background flex items-center justify-center px-4 py-8 overflow-hidden">
      <Particles
        className="absolute inset-0 z-0 animate-fade-in"
        quantity={100}
      />
      <BorderBeam size={300} duration={12} delay={9} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "relative z-10 w-full max-w-2xl rounded-2xl border border-neutral-800 bg-background p-6 shadow-2xl"
        )}
      >
        <MemoizedTextAnimate />
        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
            Product added successfully!
          </div>
        )}
        {submitError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {submitError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
          <div className="space-y-1">
            <Input
              label="Product Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={isFieldInvalid("name") ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={isFieldInvalid("name")}
            />
            {getFieldError("name") && (
              <p className="text-sm text-red-500 mt-1">{getFieldError("name")}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              label="Price"
              type="number"
              step="0.01"
              name="price"
              value={product.price}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={isFieldInvalid("price") ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={isFieldInvalid("price")}
            />
            {getFieldError("price") && (
              <p className="text-sm text-red-500 mt-1">{getFieldError("price")}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              label="Discount Price (Optional)"
              type="number"
              step="0.01"
              name="discountPrice"
              value={product.discountPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              className={isFieldInvalid("discountPrice") ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={isFieldInvalid("discountPrice")}
            />
            {getFieldError("discountPrice") && (
              <p className="text-sm text-red-500 mt-1">{getFieldError("discountPrice")}</p>
            )}
          </div>

          <div className="space-y-1">
            <Textarea
              label="Description (Optional)"
              name="description"
              value={product.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
              className={isFieldInvalid("description") ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={isFieldInvalid("description")}
            />
            {getFieldError("description") && (
              <p className="text-sm text-red-500 mt-1">{getFieldError("description")}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Input
                label="Category ID"
                type="number"
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={isFieldInvalid("categoryId") ? "border-red-500 focus:border-red-500" : ""}
                aria-invalid={isFieldInvalid("categoryId")}
              />
              {getFieldError("categoryId") && (
                <p className="text-sm text-red-500 mt-1">{getFieldError("categoryId")}</p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                label="Unit ID"
                type="number"
                name="unitId"
                value={product.unitId}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={isFieldInvalid("unitId") ? "border-red-500 focus:border-red-500" : ""}
                aria-invalid={isFieldInvalid("unitId")}
              />
              {getFieldError("unitId") && (
                <p className="text-sm text-red-500 mt-1">{getFieldError("unitId")}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Input
              label="Stock Quantity"
              type="number"
              name="stockQuantity"
              value={product.stockQuantity}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={isFieldInvalid("stockQuantity") ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={isFieldInvalid("stockQuantity")}
            />
            {getFieldError("stockQuantity") && (
              <p className="text-sm text-red-500 mt-1">{getFieldError("stockQuantity")}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              label="Image URL"
              name="image"
              value={product.image}

              onChange={handleChange}
              onBlur={handleBlur}
              required
              placeholder="https://example.com/image.jpg"
              className={isFieldInvalid("image") ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={isFieldInvalid("image")}
            />
            {getFieldError("image") && (
              <p className="text-sm text-red-500 mt-1">{getFieldError("image")}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Example for SKU field */}
          <div className="space-y-1">
            <Input
              label="SKU (Optional - must be unique)"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Leave blank for auto-generation"
              className={isFieldInvalid("sku") ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={isFieldInvalid("sku")}
            />
            {getFieldError("sku") && (
              <p className="text-sm text-red-500 mt-1">{getFieldError("sku")}</p>
            )}
            <p className="text-xs text-gray-500">Leave blank to auto-generate a unique SKU</p>
          </div>

          {/* Example for Serial Number field */}
          <div className="space-y-1">
            <Input
              label="Serial Number (Optional - must be unique)"
              name="serialNumber"
              value={product.serialNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Leave blank if not applicable"
              className={isFieldInvalid("serialNumber") ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={isFieldInvalid("serialNumber")}
            />
            {getFieldError("serialNumber") && (
              <p className="text-sm text-red-500 mt-1">{getFieldError("serialNumber")}</p>
            )}
            <p className="text-xs text-gray-500">Must be unique if provided</p>
          </div>

          {/* Example for Barcode field */}
          <div className="space-y-1">
            <Input
              label="Barcode (Optional - must be unique)"
              name="barcode"
              value={product.barcode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Leave blank if not applicable"
              className={isFieldInvalid("barcode") ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={isFieldInvalid("barcode")}
            />
            {getFieldError("barcode") && (
              <p className="text-sm text-red-500 mt-1">{getFieldError("barcode")}</p>
            )}
            <p className="text-xs text-gray-500">8-13 digits, must be unique if provided</p>
          </div>

            <div className="space-y-1">
              <Input
                label="Brand (Optional)"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                className={isFieldInvalid("brand") ? "border-red-500 focus:border-red-500" : ""}
                aria-invalid={isFieldInvalid("brand")}
              />
              {getFieldError("brand") && (
                <p className="text-sm text-red-500 mt-1">{getFieldError("brand")}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Input
                label="Weight (kg, Optional)"
                type="number"
                step="0.01"
                name="weight"
                value={product.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                className={isFieldInvalid("weight") ? "border-red-500 focus:border-red-500" : ""}
                aria-invalid={isFieldInvalid("weight")}
              />
              {getFieldError("weight") && (
                <p className="text-sm text-red-500 mt-1">{getFieldError("weight")}</p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                label="Dimensions (Optional)"
                name="dimensions"
                value={product.dimensions}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="10x5x3 (LxWxH)"
                className={isFieldInvalid("dimensions") ? "border-red-500 focus:border-red-500" : ""}
                aria-invalid={isFieldInvalid("dimensions")}
              />
              {getFieldError("dimensions") && (
                <p className="text-sm text-red-500 mt-1">{getFieldError("dimensions")}</p>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <Input
              label="Expiration Date (Optional)"
              type="date"
              name="expirationDate"
              value={product.expirationDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className={isFieldInvalid("expirationDate") ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={isFieldInvalid("expirationDate")}
            />
            {getFieldError("expirationDate") && (
              <p className="text-sm text-red-500 mt-1">{getFieldError("expirationDate")}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              label="Tags (Optional)"
              name="tags"
              value={product.tags}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="electronics, gadget, portable"
              className={isFieldInvalid("tags") ? "border-red-500 focus:border-red-500" : ""}
              aria-invalid={isFieldInvalid("tags")}
            />
            {getFieldError("tags") && (
              <p className="text-sm text-red-500 mt-1">{getFieldError("tags")}</p>
            )}
            <p className="text-xs text-gray-500">Separate tags with commas</p>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Product"}
          </Button>
        </form>
      </motion.div>
    </main>
  );
};

export default AddProduct;