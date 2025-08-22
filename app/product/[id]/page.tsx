"use client";
import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Minus,
  Plus,
  Heart,
  Share2,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
  Star,
  StarHalf,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FeaturedProducts } from "@/components/featured-products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// Define types to match your backend API
interface ProductApiResponse {
  id: string;
  title?: string;
  name?: string;
  price: number;
  sale_price: number | null;
  on_sale: boolean;
  description: string;
  stock: number;
  inStock?: boolean;
  created_at?: string;
  updated_at?: string;
  images: string[];
  metadata: {
    category: string;
    subcategories: string[];
    isSale?: boolean;
    isNew?: boolean;
    isFeatured?: boolean;
    rating?: number;
    reviews?: number;
  };
}

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  description: string;
  images: string[];
  category: string;
  colors?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isSale: boolean;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewFormData {
  author: string;
  rating: number;
  comment: string;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    author: "",
    rating: 5,
    comment: ""
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  const { addToCart } = useCart();

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewForm.author.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!reviewForm.comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    try {
      setSubmittingReview(true);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: resolvedParams.id,
          author: reviewForm.author,
          rating: reviewForm.rating,
          comment: reviewForm.comment
        }),
      });

      if (response.ok) {
        toast.success("Review submitted successfully!");
        setIsReviewDialogOpen(false);
        setReviewForm({ author: "", rating: 5, comment: "" });
        
        // Refresh both reviews and product data
        const [reviewsRes, productRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/product/${resolvedParams.id}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${resolvedParams.id}`)
        ]);
        
        if (reviewsRes.ok) {
          const updatedReviews = await reviewsRes.json();
          setReviews(updatedReviews);
          
          // Update product with new rating and review count
          if (product && updatedReviews.length > 0) {
            const totalRating = updatedReviews.reduce((sum: number, review: Review) => sum + review.rating, 0);
            const newAverageRating = totalRating / updatedReviews.length;
            
            setProduct({
              ...product,
              rating: newAverageRating,
              reviews: updatedReviews.length
            });
          }
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to submit review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const imageUrl = product.images?.[0]
      ? (product.images[0].startsWith('http') 
         ? product.images[0] 
         : `${process.env.NEXT_PUBLIC_API_URL}${product.images[0]}`)
      : "/placeholder.svg";

    const cartProduct = {
      id: product._id,
      name: product.name,
      price: product.salePrice || product.price,
      image: imageUrl,
      quantity,
      color: selectedColor || null,
    };

    addToCart(cartProduct);
    toast.success(`${product.name} added to cart!`);
  };

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClass = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} className={`${sizeClass} text-yellow-400 fill-current`} />
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <StarHalf key={i} className={`${sizeClass} text-yellow-400 fill-current`} />
        );
      } else {
        stars.push(
          <Star key={i} className={`${sizeClass} text-gray-300`} />
        );
      }
    }
    
    return <div className="flex">{stars}</div>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    async function fetchProductAndReviews() {
      try {
        setLoading(true);
        setError(null);

        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error("API configuration error");
        }

        // Fetch product and reviews in parallel
        const [productRes, reviewsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${resolvedParams.id}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/product/${resolvedParams.id}`)
        ]);

        if (!productRes.ok) {
          throw new Error(`Product not found: ${productRes.status}`);
        }
        
        const apiData: ProductApiResponse = await productRes.json();
        
        // Get reviews data
        let reviewsData: Review[] = [];
        if (reviewsRes.ok) {
          reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }

        // Calculate actual rating from reviews if we have them, otherwise use backend data
        let actualRating = apiData.metadata?.rating || 0;
        let actualReviewCount = apiData.metadata?.reviews || 0;

        if (reviewsData.length > 0) {
          const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
          actualRating = totalRating / reviewsData.length;
          actualReviewCount = reviewsData.length;
        }

        const transformedProduct: Product = {
          _id: apiData.id,
          name: apiData.title || apiData.name || "Untitled Product",
          price: apiData.price,
          salePrice: apiData.sale_price,
          description: apiData.description || "No description available",
          images: apiData.images || [],
          category: apiData.metadata?.category || "uncategorized",
          colors: [],
          rating: actualRating,
          reviews: actualReviewCount,
          inStock: apiData.inStock !== undefined 
            ? apiData.inStock 
            : apiData.stock > 0,
          isSale: apiData.metadata?.isSale || apiData.on_sale || (apiData.sale_price !== null && apiData.sale_price < apiData.price),
        };

        setProduct(transformedProduct);
        
        if (transformedProduct.colors && transformedProduct.colors.length > 0) {
          setSelectedColor(transformedProduct.colors[0]);
        }
        
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "Failed to load product");
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    }

    fetchProductAndReviews();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen pt-20">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen pt-20">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <p className="mb-8">{error || "The product you're looking for doesn't exist."}</p>
            <Link href="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/placeholder.svg";
    return imagePath.startsWith('http') 
      ? imagePath 
      : `${process.env.NEXT_PUBLIC_API_URL}${imagePath}`;
  };

  const currentPrice = product.isSale && product.salePrice ? product.salePrice : product.price;
  const originalPrice = product.isSale && product.salePrice ? product.price : null;

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700 focus:underline">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-gray-700 focus:underline"
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="brutalist-image relative h-[400px] md:h-[500px]">
              {product.images?.length > 0 ? (
                <Image
                  src={getImageUrl(product.images[selectedImage])}
                  alt={`${product.name} - Main product image`}
                  fill
                  className="object-contain"
                  priority
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              ) : (
                <Image
                  src="/placeholder.svg"
                  alt={`${product.name} - Placeholder image`}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <Button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 overflow-hidden border-4 ${
                      selectedImage === index ? "border-black" : "border-gray-300"
                    } hover:border-black transition-colors`}
                  >
                    <Image
                      src={getImageUrl(img)}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6 brutalist-container">
            <div>
              <h1 className="text-3xl font-bold uppercase">{product.name}</h1>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-3xl font-bold">
                  ${currentPrice.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-red-600 text-white px-2 py-1 text-sm font-bold">
                    SALE
                  </span>
                )}
              </div>
              
              {/* Rating */}
              <div className="mt-2 flex items-center">
                {renderStars(product.rating)}
                <span className="ml-2 text-sm text-gray-500 uppercase">
                  {product.rating > 0 ? product.rating.toFixed(1) : "No rating"} ({product.reviews} reviews)
                </span>
              </div>

              {/* Stock Status */}
              <div className="mt-2">
                <span className={`text-sm font-bold uppercase ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                  {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                </span>
              </div>
            </div>

            <p className="text-gray-700 uppercase leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-black mb-2 uppercase">Color</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 uppercase font-bold transition-colors ${
                        selectedColor === color
                          ? "bg-black text-white border-4 border-black"
                          : "border-4 border-black hover:bg-gray-100"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-bold text-black mb-2 uppercase">Quantity</h3>
              <div className="flex items-center border-4 border-black w-32">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 text-black hover:bg-black hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center font-bold">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 text-black hover:bg-black hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`brutalist-btn flex items-center justify-center ${
                  !product.inStock ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
              </button>
            </div>

            {/* Shipping Info */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCcw className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Easy Returns</h4>
                  <p className="text-sm text-gray-500">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Secure Checkout</h4>
                  <p className="text-sm text-gray-500">SSL encrypted payment</p>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center pt-2">
              <span className="text-sm text-gray-500 mr-2">Share:</span>
              <div className="flex space-x-2">
                <Button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <Share2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4 border rounded-b-md mt-1">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <div className="mt-4">
                  <h4 className="font-bold">Product Information</h4>
                  <ul className="mt-2 space-y-1">
                    <li><strong>Category:</strong> {product.category}</li>
                    <li><strong>Stock Status:</strong> {product.inStock ? "In Stock" : "Out of Stock"}</li>
                    {product.isSale && <li><strong>Sale Item:</strong> Yes</li>}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="p-4 border rounded-b-md mt-1">
              <ul className="list-disc pl-5 space-y-2">
                <li>High-quality materials</li>
                <li>Eco-friendly packaging</li>
                <li>Handcrafted with care</li>
                <li>Satisfaction guaranteed</li>
                <li>Durable construction</li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="p-4 border rounded-b-md mt-1">
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {renderStars(product.rating, "lg")}
                    <div>
                      <span className="text-2xl font-bold">
                        {product.rating > 0 ? product.rating.toFixed(1) : "0.0"}
                      </span>
                      <p className="text-sm text-gray-500">
                        Based on {product.reviews} review{product.reviews !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Write Review Button */}
                  <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="brutalist-btn">Write a Review</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Write a Review</DialogTitle>
                        <DialogDescription>
                          Share your thoughts about {product.name}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                          <Label htmlFor="author">Your Name</Label>
                          <Input
                            id="author"
                            value={reviewForm.author}
                            onChange={(e) => setReviewForm({...reviewForm, author: e.target.value})}
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label>Rating</Label>
                          <div className="flex gap-1 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewForm({...reviewForm, rating: star})}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`h-6 w-6 ${
                                    star <= reviewForm.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  } hover:text-yellow-400 transition-colors`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="comment">Review</Label>
                          <Textarea
                            id="comment"
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                            placeholder="Write your review here..."
                            rows={4}
                            required
                          />
                        </div>

                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsReviewDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" disabled={submittingReview}>
                            {submittingReview ? "Submitting..." : "Submit Review"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviewsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p>Loading reviews...</p>
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        No reviews yet. Be the first to review this product!
                      </p>
                    </div>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start gap-3">
                          <div className="bg-gray-100 rounded-full p-2">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.author}</span>
                              <span className="text-sm text-gray-500">
                                {formatDate(review.created_at)}
                              </span>
                            </div>
                            {renderStars(review.rating, "sm")}
                            <p className="mt-2 text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 uppercase">You May Also Like</h2>
          <FeaturedProducts />
        </div>
      </div>
    </div>
  );
}