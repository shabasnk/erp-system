import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/magicui/particles";
import { BorderBeam } from "@/components/magicui/border-beam";
import { TextAnimate } from "@/components/magicui/text-animate";
import { cn } from "@/lib/utils";

const AddProduct = () => {
  const [product, setProduct] = useState({
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

const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }, []);

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Product:", {
      ...product,
      tags: product.tags ? product.tags.split(",").map((t) => t.trim()) : [],
    });
    // Send data to backend
  };

  const MemoizedTextAnimate = memo(() => (
    <TextAnimate className="text-center mb-6">Add New Product</TextAnimate>
  ));
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
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
          <Input
            label="Discount Price"
            type="number"
            name="discountPrice"
            value={product.discountPrice}
            onChange={handleChange}
          />
          <Textarea
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={3}
          />
          <Input
            label="Category"
            type="text"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
          />
          <Input
            label="Unit ID"
            type="number"
            name="unitId"
            value={product.unitId}
            onChange={handleChange}
            required
          />
          <Input
            label="Stock Quantity"
            type="number"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleChange}
            required
          />
          <Input
            label="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
          <Input
            label="SKU"
            name="sku"
            value={product.sku}
            onChange={handleChange}
          />
          <Input
            label="Serial Number"
            name="serialNumber"
            value={product.serialNumber}
            onChange={handleChange}
          />
          <Input
            label="Barcode"
            name="barcode"
            value={product.barcode}
            onChange={handleChange}
          />
          <Input
            label="Brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
          />
          <Input
            label="Weight (kg)"
            type="number"
            name="weight"
            value={product.weight}
            onChange={handleChange}
          />
          <Input
            label="Dimensions (LxWxH)"
            name="dimensions"
            value={product.dimensions}
            onChange={handleChange}
          />
          <Input
            label="Expiration Date"
            type="date"
            name="expirationDate"
            value={product.expirationDate}
            onChange={handleChange}
          />
          <Input
            label="Tags (comma separated)"
            name="tags"
            value={product.tags}
            onChange={handleChange}
          />
          <Button type="submit" className="w-full mt-2">
            Submit Product
          </Button>
        </form>
      </motion.div>
    </main>
  );
};

export default AddProduct;
