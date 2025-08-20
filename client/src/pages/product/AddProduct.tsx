import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Package,
  DollarSign,
  FileText,
  Hash,
  Barcode,
  Weight,
  Calendar,
  Tag,
  Image as ImageIcon,
  Sparkles,
  CheckCircle,
  Plus
} from "lucide-react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

/** -----------------------------
 * Types
 * ------------------------------ */
interface ProductData {
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

type ValidationErrors = Partial<Record<keyof ProductData, string>>;

interface InputFieldProps {
  label: string;
  name: keyof ProductData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  icon?: React.ComponentType<{ size?: number }>;
  rows?: number;
  isTextarea?: boolean;
  placeholder?: string;
  darkMode?: boolean;
  error?: string;
  touched?: boolean;
}

interface FormField {
  name: keyof ProductData;
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
  type?: string;
  required?: boolean;
  rows?: number;
  isTextarea?: boolean;
  placeholder?: string;
}

interface FormSection {
  title: string;
  fields: FormField[];
}

/** -----------------------------
 * Helpers
 * ------------------------------ */
const gradient = "bg-gradient-to-r from-[#ea384c] to-[#FF719A]";

const safeParseURL = (val: string) => {
  try {
    const u = new URL(val);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

/** -----------------------------
 * Inputs (minimal + fast)
 * ------------------------------ */
const InputField = memo<InputFieldProps>(function InputField({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  required = false,
  icon: Icon,
  rows,
  isTextarea = false,
  placeholder,
  darkMode = false,
  error,
  touched
}) {
  const hasError = Boolean(touched && error);
  const InputEl = isTextarea ? "textarea" : "input";
  const labelId = `${String(name)}-label`;
  const helpId = `${String(name)}-help`;

  return (
    <div className="relative">
      <label
        id={labelId}
        htmlFor={String(name)}
        className={`mb-1 block text-sm font-medium ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label} {required && <span className="text-[#ea384c]">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <div
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Icon size={18} />
          </div>
        )}

        <InputEl
          id={String(name)}
          aria-labelledby={labelId}
          aria-describedby={hasError ? helpId : undefined}
          aria-invalid={hasError}
          className={[
            "w-full rounded-xl border px-3 py-3",
            Icon ? "pl-10" : "",
            darkMode
              ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
              : "bg-white border-gray-200 text-gray-800 placeholder-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-[#ea384c]/30 focus:border-[#ea384c]/60",
          ].join(" ")}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder || ""}
          rows={rows}
          type={type}
        />
      </div>

      {hasError && (
        <p id={helpId} className={`mt-1 text-xs ${darkMode ? "text-red-400" : "text-red-600"}`}>
          {error}
        </p>
      )}
    </div>
  );
});

/** -----------------------------
 * Button (no heavy animations)
 * ------------------------------ */
const SubmitButton: React.FC<{ loading: boolean; darkMode?: boolean }> = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full rounded-xl py-3 font-semibold text-white ${gradient} disabled:opacity-60 disabled:cursor-not-allowed shadow-sm`}
    >
      <span className="inline-flex items-center gap-2 justify-center">
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Creating Product...
          </>
        ) : (
          <>
            <Plus size={18} />
            Create Product
            <Sparkles size={16} />
          </>
        )}
      </span>
    </button>
  );
};

/** -----------------------------
 * Main
 * ------------------------------ */
const AddProduct: React.FC = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const { token, getAuthHeaders } = useAuth();

  const [product, setProduct] = useState<ProductData>({
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
    isActive: true
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ProductData, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Auto dismiss banners
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (submitSuccess) {
      t = setTimeout(() => setSubmitSuccess(false), 4000);
    } else if (submitError) {
      t = setTimeout(() => setSubmitError(null), 5000);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [submitSuccess, submitError]);

  const validateField = useCallback(
    (name: keyof ProductData, value: string): string => {
      switch (name) {
        case "name":
          if (!value.trim()) return "Product name is required";
          if (value.trim().length < 2) return "Product name must be at least 2 characters";
          if (value.trim().length > 100) return "Product name must be less than 100 characters";
          return "";

        case "price": {
          if (!value) return "Price is required";
          const p = Number(value);
          if (Number.isNaN(p)) return "Price must be a valid number";
          if (p <= 0) return "Price must be greater than 0";
          if (p > 999_999.99) return "Price must be less than 1,000,000";
          return "";
        }

        case "discountPrice": {
          if (!value) return "";
          const dp = Number(value);
          if (Number.isNaN(dp)) return "Discount price must be a valid number";
          if (dp < 0) return "Discount price cannot be negative";
          const rp = Number(product.price);
          if (!Number.isNaN(rp) && rp > 0 && dp >= rp) return "Discount price must be less than regular price";
          return "";
        }

        case "description":
          if (value.length > 1000) return "Description must be less than 1000 characters";
          return "";

        case "categoryId": {
          if (!value) return "Category ID is required";
          const id = Number(value);
          if (!Number.isInteger(id)) return "Category ID must be a number";
          if (id <= 0) return "Category ID must be positive";
          return "";
        }

        case "unitId": {
          if (!value) return "Unit ID is required";
          const id = Number(value);
          if (!Number.isInteger(id)) return "Unit ID must be a number";
          if (id <= 0) return "Unit ID must be positive";
          return "";
        }

        case "stockQuantity": {
          if (!value) return "Stock quantity is required";
          const s = Number(value);
          if (!Number.isInteger(s)) return "Stock quantity must be a number";
          if (s < 0) return "Stock quantity cannot be negative";
          if (s > 999_999) return "Stock quantity must be less than 1,000,000";
          return "";
        }

        case "image":
          if (!value.trim()) return "Image URL is required";
          if (!safeParseURL(value)) return "Please enter a valid URL (http/https)";
          return "";

        case "sku":
          if (!value) return "";
          if (value.length < 3 || value.length > 50) return "SKU must be between 3 and 50 characters";
          return "";

        case "barcode":
          if (!value) return "";
          if (!/^[0-9]{8,13}$/.test(value)) return "Barcode must be 8–13 digits";
          return "";

        case "brand":
          if (value && value.length > 50) return "Brand name must be less than 50 characters";
          return "";

        case "weight":
          if (!value) return "";
          {
            const w = Number(value);
            if (Number.isNaN(w)) return "Weight must be a number";
            if (w <= 0) return "Weight must be greater than 0";
            if (w > 10_000) return "Weight must be less than 10,000 kg";
            return "";
          }

        case "dimensions":
          if (!value) return "";
          if (!/^\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?$/i.test(value)) {
            return "Dimensions must be in format LxWxH (e.g., 10x5x3)";
          }
          return "";

        case "expirationDate":
          if (!value) return "";
          {
            const d = new Date(value);
            if (Number.isNaN(d.getTime())) return "Invalid date";
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (d <= today) return "Expiration date must be in the future";
            return "";
          }

        case "tags": {
          if (!value) return "";
          const tags = value.split(",").map(t => t.trim()).filter(Boolean);
          if (tags.length > 10) return "Maximum 10 tags allowed";
          if (tags.some(t => t.length > 30)) return "Each tag must be less than 30 characters";
          return "";
        }

        default:
          return "";
      }
    },
    [product.price]
  );

  const validateForm = useCallback((): boolean => {
    const next: ValidationErrors = {};
    (Object.keys(product) as (keyof ProductData)[]).forEach((k) => {
      if (k === "isActive") return;
      const err = validateField(k, String(product[k] ?? ""));
      if (err) next[k] = err;
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [product, validateField]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProduct(prev => ({ ...prev, [name]: value }));
      if (errors[name as keyof ProductData]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTouched(prev => ({ ...prev, [name]: true }));
      const err = validateField(name as keyof ProductData, value);
      setErrors(prev => ({ ...prev, [name]: err || undefined }));
    },
    [validateField]
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!token) {
        setSubmitError("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
        return;
      }

      setLoading(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      // mark all as touched for showing validation
      const allTouched: Partial<Record<keyof ProductData, boolean>> = {};
      (Object.keys(product) as (keyof ProductData)[]).forEach((k) => (allTouched[k] = true));
      setTouched(allTouched);

      const ok = validateForm();
      if (!ok) {
        setLoading(false);
        return;
      }

      try {
        const submissionData = {
          ...product,
          tags: product.tags ? product.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
          price: parseFloat(product.price),
          discountPrice: product.discountPrice ? parseFloat(product.discountPrice) : null,
          categoryId: parseInt(product.categoryId),
          unitId: parseInt(product.unitId),
          stockQuantity: parseInt(product.stockQuantity),
          weight: product.weight ? parseFloat(product.weight) : null,
          expirationDate: product.expirationDate || null,
          sku: product.sku || null,
          serialNumber: product.serialNumber || null,
          barcode: product.barcode || null,
          isActive: product.isActive
        };

        await axios.post("http://localhost:8080/api/product/product", submissionData, {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders()
          }
        });

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
          isActive: true
        });
        setTouched({});
        setErrors({});
        setSubmitSuccess(true);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setSubmitError("Session expired. Please log in again.");
            localStorage.removeItem("token");
            setTimeout(() => (window.location.href = "/login"), 1500);
          } else {
            setSubmitError(
              (err.response?.data as any)?.message ||
                (err.response?.data as any)?.error ||
                "Error submitting product. Please try again."
            );
          }
        } else {
          setSubmitError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [getAuthHeaders, product, token, validateForm]
  );

  const formSections: FormSection[] = useMemo(
    () => [
      {
        title: "Basic Information",
        fields: [
          { name: "name", label: "Product Name", icon: Package, required: true },
          { name: "description", label: "Description", icon: FileText, isTextarea: true, rows: 4 },
          { name: "brand", label: "Brand", icon: Tag }
        ]
      },
      {
        title: "Pricing & Inventory",
        fields: [
          { name: "price", label: "Price", icon: DollarSign, type: "number", required: true },
          { name: "discountPrice", label: "Discount Price", icon: DollarSign, type: "number" },
          { name: "stockQuantity", label: "Stock Quantity", icon: Hash, type: "number", required: true }
        ]
      },
      {
        title: "Product Details",
        fields: [
          { name: "sku", label: "SKU", icon: Hash },
          { name: "barcode", label: "Barcode", icon: Barcode },
          { name: "serialNumber", label: "Serial Number", icon: Hash },
          { name: "weight", label: "Weight (kg)", icon: Weight, type: "number" },
          { name: "dimensions", label: "Dimensions (L×W×H)", icon: Package }
        ]
      },
      {
        title: "Additional Information",
        fields: [
          { name: "categoryId", label: "Category ID", icon: Hash, type: "number", required: true },
          { name: "unitId", label: "Unit ID", icon: Hash, type: "number", required: true },
          { name: "image", label: "Image URL", icon: ImageIcon, required: true },
          { name: "expirationDate", label: "Expiration Date", icon: Calendar, type: "date" },
          { name: "tags", label: "Tags (comma separated)", icon: Tag }
        ]
      }
    ],
    []
  );

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-pink-50 via-white to-purple-50"
      }`}
    >
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div
            className={`mx-auto mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
              darkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700"
            }`}
          >
            <Sparkles className="h-4 w-4 text-[#ea384c]" />
            <span className="font-medium">Product Management</span>
          </div>
          <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            <span className={`bg-clip-text text-transparent ${gradient}`}>Add New Product</span>
          </h1>
          <p className={`mt-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Create and manage your products with a fast, minimal form.
          </p>
        </div>

        {/* Card */}
        <div
          className={`rounded-2xl border p-6 shadow-sm ${
            darkMode ? "bg-gray-800/70 border-gray-700" : "bg-white/90 border-gray-200"
          }`}
        >
          {/* Alerts */}
          {submitSuccess && (
            <div className={`mb-4 flex items-center gap-2 rounded-lg p-3 text-sm ${
              darkMode ? "bg-green-900/40 text-green-300" : "bg-green-50 text-green-800"
            }`}>
              <CheckCircle className="h-5 w-5" />
              Product added successfully!
            </div>
          )}
          {submitError && (
            <div className={`mb-4 rounded-lg p-3 text-sm ${
              darkMode ? "bg-red-900/40 text-red-300" : "bg-red-50 text-red-800"
            }`}>
              {submitError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-8">
            {formSections.map((section, idx) => (
              <section key={idx} className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${gradient}`}>
                    {idx + 1}
                  </div>
                  <h3 className={`text-lg font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {section.title}
                  </h3>
                  <div className={`ml-2 h-px flex-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {section.fields.map((f) => (
                    <div key={String(f.name)} className={f.isTextarea ? "md:col-span-2" : ""}>
                      <InputField
                        label={f.label}
                        name={f.name}
                        value={product[f.name] as string}
                        onChange={onChange}
                        onBlur={onBlur}
                        type={f.type}
                        required={f.required}
                        icon={f.icon}
                        rows={f.rows}
                        isTextarea={f.isTextarea}
                        placeholder={f.placeholder}
                        darkMode={darkMode}
                        error={errors[f.name]}
                        touched={touched[f.name]}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <div className="pt-2">
              <SubmitButton loading={loading} darkMode={darkMode} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;